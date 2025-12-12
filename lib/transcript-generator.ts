/**
 * Transcript generator using Deepgram API
 * Downloads YouTube videos, extracts audio, and transcribes them
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import { promises as fs } from 'fs';
import path from 'path';
import { createClient } from '@deepgram/sdk';

const execAsync = promisify(exec);

export interface TranscriptSegment {
  text: string;
  start: number;
  end: number;
  confidence: number;
  speaker?: number;
}

export interface SpeakerStats {
  speaker: number;
  wordCount: number;
  duration: number;
  percentage: number;
}

export interface TranscriptResult {
  fullText: string;
  fullTextAllSpeakers?: string; // Unfiltered text with all speakers
  segments: TranscriptSegment[];
  duration: number;
  videoId?: string;
  videoTitle?: string;
  videoUrl?: string;
  speakerStats?: SpeakerStats[];
  primarySpeaker?: number;
}

export class TranscriptGenerator {
  private deepgram;
  private storageDir: string;
  private videoDir: string;
  private transcriptDir: string;

  constructor(apiKey: string, storageDir: string = './storage') {
    this.deepgram = createClient(apiKey);
    this.storageDir = storageDir;
    this.videoDir = path.join(storageDir, 'videos');
    this.transcriptDir = path.join(storageDir, 'transcripts');
  }

  /**
   * Generate transcript from YouTube video URL
   */
  async generateFromYouTube(videoUrl: string, videoTitle?: string): Promise<TranscriptResult> {
    console.log(`Generating transcript for: ${videoUrl}`);

    try {
      // Ensure storage directories exist
      await fs.mkdir(this.videoDir, { recursive: true });
      await fs.mkdir(this.transcriptDir, { recursive: true });

      const videoId = this.extractVideoId(videoUrl);

      // Download video (stored permanently)
      const videoPath = await this.downloadVideo(videoUrl);

      // Extract audio (temporary - will be deleted after transcription)
      const audioPath = await this.extractAudio(videoPath);

      // Transcribe audio
      const transcript = await this.transcribeAudio(audioPath);

      // Clean up only the audio file (keep video)
      await this.cleanupAudio(audioPath);

      // Add metadata to transcript
      return {
        ...transcript,
        videoId,
        videoTitle,
        videoUrl,
      };
    } catch (error) {
      console.error('Error generating transcript:', error);
      throw error;
    }
  }

  /**
   * Download YouTube video using yt-dlp
   */
  private async downloadVideo(videoUrl: string): Promise<string> {
    const videoId = this.extractVideoId(videoUrl);
    const outputPath = path.join(this.videoDir, `${videoId}.mp4`);

    // Check if video already exists
    try {
      await fs.access(outputPath);
      console.log(`Video already downloaded: ${outputPath}`);
      return outputPath;
    } catch {
      // Video doesn't exist, download it
    }

    // Download using yt-dlp with fallback formats to handle YouTube restrictions
    // Using more flexible format selection to avoid SABR-only errors
    // Using --cookies-from-browser to bypass YouTube bot detection
    const command = `yt-dlp -f "bv*[ext=mp4]+ba[ext=m4a]/b[ext=mp4]/bv*+ba/b" --merge-output-format mp4 --cookies-from-browser chrome -o "${outputPath}" "${videoUrl}"`;

    console.log(`Downloading video from ${videoUrl}...`);
    await execAsync(command, { maxBuffer: 1024 * 1024 * 100 }); // 100MB buffer

    return outputPath;
  }

  /**
   * Extract audio from video using ffmpeg
   */
  private async extractAudio(videoPath: string): Promise<string> {
    const audioPath = videoPath.replace('.mp4', '_audio.wav');

    // Check if audio already exists
    try {
      await fs.access(audioPath);
      console.log(`Audio already extracted: ${audioPath}`);
      return audioPath;
    } catch {
      // Audio doesn't exist, extract it
    }

    // Extract audio to WAV format (16kHz, mono) - optimal for speech recognition
    const command = `ffmpeg -i "${videoPath}" -vn -acodec pcm_s16le -ar 16000 -ac 1 "${audioPath}" -y`;

    console.log(`Extracting audio from video...`);
    await execAsync(command, { maxBuffer: 1024 * 1024 * 50 });

    return audioPath;
  }

  /**
   * Transcribe audio using Deepgram
   */
  private async transcribeAudio(audioPath: string): Promise<TranscriptResult> {
    console.log(`Transcribing audio with Deepgram...`);

    // Read audio file
    const audioBuffer = await fs.readFile(audioPath);

    // Transcribe with Deepgram
    const { result, error } = await this.deepgram.listen.prerecorded.transcribeFile(
      audioBuffer,
      {
        model: 'nova-2',
        smart_format: true,
        punctuate: true,
        paragraphs: true,
        utterances: true,
        diarize: true, // Speaker diarization
      }
    );

    if (error) {
      throw new Error(`Deepgram transcription error: ${error.message}`);
    }

    // Extract transcript data
    const channel = result.results.channels[0];
    const alternative = channel.alternatives[0];

    // Calculate speaker statistics
    const speakerData = new Map<number, { wordCount: number; duration: number }>();

    if (alternative.words) {
      for (const word of alternative.words) {
        const speaker = word.speaker ?? 0;
        const data = speakerData.get(speaker) || { wordCount: 0, duration: 0 };
        data.wordCount++;
        data.duration += (word.end - word.start);
        speakerData.set(speaker, data);
      }
    }

    // Find primary speaker (most speaking time)
    let primarySpeaker = 0;
    let maxDuration = 0;
    const totalDuration = result.metadata.duration || 0;

    const speakerStats: SpeakerStats[] = [];
    speakerData.forEach((data, speaker) => {
      const stats: SpeakerStats = {
        speaker,
        wordCount: data.wordCount,
        duration: data.duration,
        percentage: totalDuration > 0 ? (data.duration / totalDuration) * 100 : 0,
      };
      speakerStats.push(stats);

      if (data.duration > maxDuration) {
        maxDuration = data.duration;
        primarySpeaker = speaker;
      }
    });

    console.log(`Detected ${speakerData.size} speakers. Primary speaker: ${primarySpeaker} (${maxDuration.toFixed(1)}s, ${speakerStats.find(s => s.speaker === primarySpeaker)?.percentage.toFixed(1)}%)`);

    // Build segments with timestamps (filtered to primary speaker only)
    const segments: TranscriptSegment[] = [];
    const allSegments: TranscriptSegment[] = [];

    if (alternative.words) {
      // Group words into segments (roughly every 30 seconds)
      let currentSegment: TranscriptSegment | null = null;
      let currentAllSegment: TranscriptSegment | null = null;
      const segmentDuration = 30; // seconds

      for (const word of alternative.words) {
        const wordSpeaker = word.speaker ?? 0;

        // Build all-speakers segments
        if (!currentAllSegment || word.start >= currentAllSegment.start + segmentDuration) {
          if (currentAllSegment) {
            allSegments.push(currentAllSegment);
          }
          currentAllSegment = {
            text: word.punctuated_word || word.word,
            start: word.start,
            end: word.end,
            confidence: word.confidence,
            speaker: wordSpeaker,
          };
        } else {
          currentAllSegment.text += ' ' + (word.punctuated_word || word.word);
          currentAllSegment.end = word.end;
          currentAllSegment.confidence = (currentAllSegment.confidence + word.confidence) / 2;
        }

        // Build primary speaker segments (filtered)
        if (wordSpeaker === primarySpeaker) {
          if (!currentSegment || word.start >= currentSegment.start + segmentDuration) {
            if (currentSegment) {
              segments.push(currentSegment);
            }
            currentSegment = {
              text: word.punctuated_word || word.word,
              start: word.start,
              end: word.end,
              confidence: word.confidence,
              speaker: wordSpeaker,
            };
          } else {
            currentSegment.text += ' ' + (word.punctuated_word || word.word);
            currentSegment.end = word.end;
            currentSegment.confidence = (currentSegment.confidence + word.confidence) / 2;
          }
        }
      }

      if (currentSegment) {
        segments.push(currentSegment);
      }
      if (currentAllSegment) {
        allSegments.push(currentAllSegment);
      }
    }

    // Build filtered full text (primary speaker only)
    const fullText = segments.map(s => s.text).join(' ');
    const fullTextAllSpeakers = alternative.transcript;

    console.log(`Filtered transcript: ${alternative.words?.length || 0} total words -> ${fullText.split(' ').length} words from primary speaker`);

    return {
      fullText,
      fullTextAllSpeakers,
      segments,
      duration: totalDuration,
      speakerStats: speakerStats.sort((a, b) => b.duration - a.duration),
      primarySpeaker,
    };
  }

  /**
   * Extract video ID from YouTube URL
   */
  private extractVideoId(url: string): string {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    return match ? match[1] : url;
  }

  /**
   * Clean up temporary audio file (keep video permanently)
   */
  private async cleanupAudio(audioPath: string): Promise<void> {
    try {
      await fs.unlink(audioPath);
      console.log('Cleaned up temporary audio file');
    } catch (error) {
      console.error('Error cleaning up audio file:', error);
    }
  }

  /**
   * Get transcript from cache if available
   */
  async getCachedTranscript(videoId: string): Promise<TranscriptResult | null> {
    const cachePath = path.join(this.transcriptDir, `${videoId}.json`);

    try {
      const data = await fs.readFile(cachePath, 'utf-8');
      return JSON.parse(data);
    } catch {
      return null;
    }
  }

  /**
   * Save transcript to cache
   */
  async cacheTranscript(videoId: string, transcript: TranscriptResult): Promise<void> {
    const cachePath = path.join(this.transcriptDir, `${videoId}.json`);

    await fs.mkdir(this.transcriptDir, { recursive: true });
    await fs.writeFile(cachePath, JSON.stringify(transcript, null, 2));
  }

  /**
   * Get all cached transcript IDs
   */
  async getAllCachedTranscripts(): Promise<string[]> {
    try {
      const files = await fs.readdir(this.transcriptDir);
      return files
        .filter(f => f.endsWith('.json'))
        .map(f => f.replace('.json', ''));
    } catch {
      return [];
    }
  }
}

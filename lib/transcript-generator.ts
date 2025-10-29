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
}

export interface TranscriptResult {
  fullText: string;
  segments: TranscriptSegment[];
  duration: number;
}

export class TranscriptGenerator {
  private deepgram;
  private tempDir: string;

  constructor(apiKey: string, tempDir: string = './temp/transcripts') {
    this.deepgram = createClient(apiKey);
    this.tempDir = tempDir;
  }

  /**
   * Generate transcript from YouTube video URL
   */
  async generateFromYouTube(videoUrl: string): Promise<TranscriptResult> {
    console.log(`Generating transcript for: ${videoUrl}`);

    try {
      // Ensure temp directory exists
      await fs.mkdir(this.tempDir, { recursive: true });

      // Download video
      const videoPath = await this.downloadVideo(videoUrl);

      // Extract audio
      const audioPath = await this.extractAudio(videoPath);

      // Transcribe audio
      const transcript = await this.transcribeAudio(audioPath);

      // Clean up temporary files
      await this.cleanup(videoPath, audioPath);

      return transcript;
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
    const outputPath = path.join(this.tempDir, `${videoId}.mp4`);

    // Check if video already exists
    try {
      await fs.access(outputPath);
      console.log(`Video already downloaded: ${outputPath}`);
      return outputPath;
    } catch {
      // Video doesn't exist, download it
    }

    // Download using yt-dlp (best quality audio/video)
    const command = `yt-dlp -f "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best" -o "${outputPath}" "${videoUrl}"`;

    console.log(`Downloading video from ${videoUrl}...`);
    await execAsync(command, { maxBuffer: 1024 * 1024 * 50 }); // 50MB buffer

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

    // Build segments with timestamps
    const segments: TranscriptSegment[] = [];

    if (alternative.words) {
      // Group words into segments (roughly every 30 seconds)
      let currentSegment: TranscriptSegment | null = null;
      const segmentDuration = 30; // seconds

      for (const word of alternative.words) {
        if (!currentSegment || word.start >= currentSegment.start + segmentDuration) {
          if (currentSegment) {
            segments.push(currentSegment);
          }
          currentSegment = {
            text: word.punctuated_word || word.word,
            start: word.start,
            end: word.end,
            confidence: word.confidence,
          };
        } else {
          currentSegment.text += ' ' + (word.punctuated_word || word.word);
          currentSegment.end = word.end;
          currentSegment.confidence = (currentSegment.confidence + word.confidence) / 2;
        }
      }

      if (currentSegment) {
        segments.push(currentSegment);
      }
    }

    return {
      fullText: alternative.transcript,
      segments,
      duration: result.metadata.duration || 0,
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
   * Clean up temporary files
   */
  private async cleanup(videoPath: string, audioPath: string): Promise<void> {
    try {
      await fs.unlink(videoPath);
      await fs.unlink(audioPath);
      console.log('Cleaned up temporary files');
    } catch (error) {
      console.error('Error cleaning up temporary files:', error);
    }
  }

  /**
   * Get transcript from cache if available
   */
  async getCachedTranscript(videoId: string): Promise<TranscriptResult | null> {
    const cachePath = path.join(this.tempDir, `${videoId}_transcript.json`);

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
    const cachePath = path.join(this.tempDir, `${videoId}_transcript.json`);

    await fs.mkdir(this.tempDir, { recursive: true });
    await fs.writeFile(cachePath, JSON.stringify(transcript, null, 2));
  }
}

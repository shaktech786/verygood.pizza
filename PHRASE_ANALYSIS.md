# VGP Phrase Analysis Feature

## Overview

This feature automatically analyzes transcripts from all YouTube videos on the @verygoodpizzaofficial channel to extract:
- **Catchphrases**: Unique signature phrases used by the streamer
- **Common Phrases**: Most frequently used multi-word expressions
- **Top Words**: Individual words used most often

The system auto-updates weekly to include new content.

## How It Works

### 1. **Data Collection**
- Fetches all videos from the YouTube channel using RSS feed (no API key required)
- Downloads transcripts for each video using the `youtube-transcript` library
- Stores raw transcript data for analysis

### 2. **Natural Language Processing**
- Uses the `natural` NLP library to tokenize and analyze text
- Filters out common stop words and generic phrases
- Extracts n-grams (2-5 word phrases) with minimum occurrence thresholds
- Identifies unique catchphrases by excluding generic streaming language

### 3. **Caching & Updates**
- Results are cached in `data/phrases-cache.json`
- Cron job runs every Sunday at 2 AM to refresh data
- Manual updates can be triggered via API endpoint

### 4. **Display**
- Gaming-themed UI component shows top phrases in tabs
- Stats show total videos analyzed, words processed, and unique catchphrases
- Auto-refreshes when new data is available

## API Endpoints

### GET `/api/phrases`
Returns cached phrase analysis data.

**Response:**
```json
{
  "topPhrases": [
    { "phrase": "lets go", "count": 45, "percentage": 0.12 }
  ],
  "topWords": [
    { "phrase": "game", "count": 120, "percentage": 0.32 }
  ],
  "catchphrases": [
    { "phrase": "very good", "count": 78, "percentage": 0.21 }
  ],
  "totalWords": 38500,
  "videosAnalyzed": 25,
  "lastUpdated": "2025-10-28T12:00:00.000Z"
}
```

### POST `/api/phrases/update`
Triggers a new phrase analysis (requires CRON_SECRET in production).

**Request:**
```json
{
  "secret": "your_cron_secret"
}
```

**Response:**
```json
{
  "success": true,
  "topPhrases": [...],
  "videosAnalyzed": 25,
  "lastUpdated": "2025-10-28T12:00:00.000Z"
}
```

## Manual Update

To manually trigger an analysis update:

```bash
curl -X POST http://localhost:3000/api/phrases/update \\
  -H "Content-Type: application/json" \\
  -d '{"secret": "your_cron_secret"}'
```

## Configuration

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
CRON_SECRET=your_random_secret_key
```

### Cron Schedule

The cron job is configured in `lib/cron.ts`:
- **Schedule**: Every Sunday at 2:00 AM
- **Pattern**: `0 2 * * 0`

To modify the schedule, edit the cron pattern in `lib/cron.ts`.

## File Structure

```
verygood.pizza/
├── lib/
│   ├── youtube.ts              # YouTube video & transcript fetching
│   ├── phrase-analysis.ts      # NLP phrase extraction algorithms
│   └── cron.ts                 # Cron job configuration
├── app/
│   └── api/
│       └── phrases/
│           ├── route.ts        # GET cached phrases
│           └── update/
│               └── route.ts    # POST trigger analysis
├── components/
│   └── CommonPhrases.tsx       # UI component for displaying phrases
└── data/
    └── phrases-cache.json      # Cached analysis results
```

## Features

### Smart Filtering
- Removes common streaming phrases ("thank you", "see you later")
- Filters out stop words ("the", "and", "but")
- Only includes words with 4+ characters
- Requires minimum occurrence thresholds

### Multi-Tab Display
- **Catchphrases**: Unique signature phrases (excludes generic language)
- **Common Phrases**: 2-5 word combinations used most frequently
- **Top Words**: Individual high-frequency words

### Gaming Aesthetic
- Neon-bordered cards with glow effects
- Color-coded by ranking (top 3, 4-6, 7+)
- Pulse animations on active tabs
- Responsive grid layout

## Limitations

1. **YouTube Transcripts Only**: Only analyzes videos with available transcripts (auto-generated or manual)
2. **English Language**: NLP analysis optimized for English content
3. **No Speaker Diarization**: Cannot isolate streamer voice from game audio, music, or Discord chat
4. **RSS Feed Limit**: YouTube RSS feeds typically show ~15 most recent videos

## Future Enhancements

Potential improvements:
- [ ] Add Twitch VOD transcript support
- [ ] Implement speaker diarization to isolate streamer voice
- [ ] Add sentiment analysis for phrase context
- [ ] Create phrase trend analysis over time
- [ ] Add phrase search and filtering
- [ ] Generate downloadable phrase reports

## Troubleshooting

### No phrases showing
1. Check if transcripts are available on YouTube videos
2. Manually trigger an update: `curl -X POST http://localhost:3000/api/phrases/update`
3. Check console logs for errors

### Cron job not running
1. Ensure the app is running (cron jobs only run in active Node.js processes)
2. For production, use a platform cron (Vercel Cron, AWS EventBridge)
3. Check CRON_SECRET is set correctly

### Analysis taking too long
- Increase timeout in API route
- Reduce number of videos analyzed
- Adjust n-gram length in `phrase-analysis.ts`

## License

Part of the Very Good Pizza website project.

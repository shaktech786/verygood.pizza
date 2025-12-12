#!/usr/bin/env tsx

/**
 * Start all background workers
 * Usage: npm run workers
 */

import '../workers/transcription-worker';
import '../workers/phrase-analysis-worker';

console.log('🚀 All workers started and listening for jobs...\n');
console.log('Press Ctrl+C to stop\n');

// Keep process alive
process.stdin.resume();

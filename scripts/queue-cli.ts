#!/usr/bin/env tsx

/**
 * Queue Management CLI
 * Usage: npx tsx scripts/queue-cli.ts <command>
 */

import {
  getAllTranscriptionJobs,
  getQueueMetrics,
  clearAllJobs,
  addPhraseAnalysisJob,
} from '../lib/queue';

const command = process.argv[2];

async function main() {
  switch (command) {
    case 'status':
      await showStatus();
      break;
    case 'metrics':
      await showMetrics();
      break;
    case 'clear':
      await clearJobs();
      break;
    case 'analyze':
      await triggerAnalysis();
      break;
    default:
      showHelp();
  }
  process.exit(0);
}

async function showStatus() {
  console.log('\n📊 Job Queue Status\n');

  const jobs = await getAllTranscriptionJobs();

  console.log('Transcription Jobs:');
  console.log(`  ⏳ Waiting: ${jobs.waiting.length}`);
  console.log(`  ⚙️  Active: ${jobs.active.length}`);
  console.log(`  ✅ Completed: ${jobs.completed.length}`);
  console.log(`  ❌ Failed: ${jobs.failed.length}`);

  if (jobs.active.length > 0) {
    console.log('\n🔄 Active Jobs:');
    jobs.active.forEach(j => {
      console.log(`  - ${j.data.videoTitle} (${j.progress || 0}%)`);
    });
  }

  if (jobs.waiting.length > 0) {
    console.log('\n⏳ Waiting Jobs:');
    jobs.waiting.slice(0, 5).forEach(j => {
      console.log(`  - ${j.data.videoTitle}`);
    });
    if (jobs.waiting.length > 5) {
      console.log(`  ... and ${jobs.waiting.length - 5} more`);
    }
  }

  if (jobs.failed.length > 0) {
    console.log('\n❌ Recent Failures:');
    jobs.failed.slice(0, 3).forEach(j => {
      console.log(`  - ${j.data.videoTitle}`);
      console.log(`    Reason: ${j.failedReason}`);
    });
  }

  console.log('');
}

async function showMetrics() {
  console.log('\n📈 Queue Metrics\n');

  const metrics = await getQueueMetrics();

  console.log('Transcription Queue:');
  console.log(`  Waiting: ${metrics.transcription.waiting || 0}`);
  console.log(`  Active: ${metrics.transcription.active || 0}`);
  console.log(`  Completed: ${metrics.transcription.completed || 0}`);
  console.log(`  Failed: ${metrics.transcription.failed || 0}`);
  console.log(`  Delayed: ${metrics.transcription.delayed || 0}`);

  console.log('\nPhrase Analysis Queue:');
  console.log(`  Waiting: ${metrics.phraseAnalysis.waiting || 0}`);
  console.log(`  Active: ${metrics.phraseAnalysis.active || 0}`);
  console.log(`  Completed: ${metrics.phraseAnalysis.completed || 0}`);
  console.log(`  Failed: ${metrics.phraseAnalysis.failed || 0}`);
  console.log(`  Delayed: ${metrics.phraseAnalysis.delayed || 0}`);

  console.log('');
}

async function clearJobs() {
  console.log('\n🗑️  Clearing all jobs...');

  await clearAllJobs();

  console.log('✅ All jobs cleared\n');
}

async function triggerAnalysis() {
  console.log('\n📊 Triggering phrase analysis...');

  const job = await addPhraseAnalysisJob({ force: true });

  console.log(`✅ Phrase analysis job enqueued (ID: ${job.id})\n`);
}

function showHelp() {
  console.log(`
📋 Queue Management CLI

Usage: npx tsx scripts/queue-cli.ts <command>

Commands:
  status    Show current status of all jobs
  metrics   Show detailed queue metrics
  clear     Clear all jobs from queues (destructive!)
  analyze   Trigger phrase analysis job
  help      Show this help message

Examples:
  npx tsx scripts/queue-cli.ts status
  npx tsx scripts/queue-cli.ts metrics
  npx tsx scripts/queue-cli.ts analyze
`);
}

main().catch(console.error);

/**
 * Cron job configuration for weekly phrase analysis updates
 * This runs every Sunday at 2 AM to analyze new content
 */

import cron from 'node-cron';

export function setupCronJobs() {
  // Run every Sunday at 2:00 AM
  cron.schedule('0 2 * * 0', async () => {
    console.log('Running weekly phrase analysis update...');

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/phrases/update`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            secret: process.env.CRON_SECRET,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log('Phrase analysis updated successfully:', data);
      } else {
        console.error('Failed to update phrase analysis:', await response.text());
      }
    } catch (error) {
      console.error('Error running phrase analysis cron job:', error);
    }
  });

  console.log('Cron jobs initialized: Weekly phrase analysis (Sundays at 2 AM)');
}

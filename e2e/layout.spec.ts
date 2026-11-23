import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const WIDTHS = [360, 390, 768, 1024, 1440];

for (const width of WIDTHS) {
  test(`no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
}

test('the Twitch action is fully above the fold on a 390x844 phone', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const cta = page.getByRole('link', { name: /twitch/i }).first();
  await expect(cta).toHaveAttribute('href', 'https://www.twitch.tv/verygoodpizza');
  const box = await cta.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.y + box!.height).toBeLessThanOrEqual(844);
});

for (const width of [390, 1440]) {
  test(`no serious axe violations at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const { violations } = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    const serious = violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
    expect(serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(', ')}`)).toEqual([]);
  });
}

test('console opens with ~, runs help, and returns focus on Escape', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Backquote');
  const dialog = page.getByRole('dialog', { name: 'Console' });
  await expect(dialog).toBeVisible();
  await page.getByLabel('Console command').fill('help');
  await page.keyboard.press('Enter');
  await expect(dialog).toContainText('connect');
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(page.getByRole('button', { name: /console/i })).toBeFocused();
});

test('games list shows every genre, and a game without clips points to Twitch', async ({ page }) => {
  await page.goto('/');
  const games = page.getByRole('region', { name: 'What I play' });
  for (const genre of ['Shooter', 'Sandbox', 'Deckbuilder', 'Retro']) await expect(games).toContainText(genre);
  const hitAndRun = games.getByRole('row', { name: /Hit & Run/ });
  await expect(hitAndRun).toContainText('No clips yet');
  await expect(hitAndRun.getByRole('link')).toHaveAttribute('href', 'https://www.twitch.tv/verygoodpizza');
});

test('a game row jumps to that game’s clips', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /Minecraft clips/ }).click();
  await expect(page.getByRole('button', { name: 'Minecraft', exact: true })).toHaveAttribute('aria-pressed', 'true');
});

test('Prelive is promoted below the Twitch action', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const twitch = await page.getByRole('link', { name: /twitch/i }).first().boundingBox();
  const prelive = page.getByRole('link', { name: /prelive/i }).first();
  await expect(prelive).toHaveAttribute('href', 'https://prelive.ai');
  const box = await prelive.boundingBox();
  expect(box!.y).toBeGreaterThan(twitch!.y + twitch!.height);
});

test('killfeed filter shows only that game', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'PEAK', exact: true }).click();
  const tags = await page.locator('ol li > button > span:nth-child(2)').allTextContents();
  expect(tags.length).toBeGreaterThan(0);
  expect(new Set(tags)).toEqual(new Set(['PEAK']));
});

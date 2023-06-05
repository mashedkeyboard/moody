import { test } from '@playwright/test';

test('redirects home when logged out to the login page', async ({ page }) => {
  await page.goto('/');

  await page.waitForURL('**/login')
});
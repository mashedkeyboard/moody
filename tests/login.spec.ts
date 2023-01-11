import { test, expect } from '@playwright/test';

test('has title and unlock password on homepage', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', {level: 1})).toHaveText("Welcome to moody");

  await expect(page.getByRole('textbox')).toBeTruthy();
});

test('can create a new empty locally-stored mood vault', async ({ page }) => {
  await page.goto('/');

  const pwdBox = page.getByLabel("Password");
  // Expect a title "to contain" a substring.
  await pwdBox.fill("password");
  await pwdBox.press('Enter');

  await expect(page.getByRole('heading', {level: 1})).toHaveText("How are you feeling today?");
});

// test('will go to authenticated pages once authenticated', async ({ page }) => {
//   await page.goto('/');

//   const pwdBox = page.getByLabel("Password");
//   // Expect a title "to contain" a substring.
//   await pwdBox.fill("password");
//   await pwdBox.press('Enter');

//   doesn't work because vault closes on refresh; TODO consider is this even needed?
//   await page.goto('/');
//   await expect(page.url()).toEqual("/log");
// });
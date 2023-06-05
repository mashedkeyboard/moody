import { test, expect } from '@playwright/test';
import fakeLogin from '$tests/support/FakeLogin';
import { LocalStorageStore } from '$lib/stores/LocalStorageStore';
import { TestStore } from '$lib/stores/TestStore';
import { vi } from 'vitest';

test('has title and provider on login page', async ({ page }) => {
  await page.goto('/login');

  await expect(page.getByRole('heading', {level: 1})).toHaveText("Welcome to Moody");

  await expect(page.getByText('Local storage')).toHaveCount(1);
  await expect(page.getByLabel('Password')).toHaveCount(0);
});

test('adds password on provider selection', async ({ page }) => {
  await page.goto('/login');

  await page.getByText("Local storage").click();
  await expect(page.getByLabel('Password')).toHaveCount(1);
});

test('shows all providers', async ({ page }) => {
  await page.goto('/login?enableTest=1');

  await expect(page.getByText("Local storage")).toHaveCount(1);
  await expect(page.getByText("Test storage")).toHaveCount(1);
});

test('defaults to not showing test provider', async ({ page }) => {
  await page.goto('/login');

  await expect(page.getByText("Test storage")).toHaveCount(0);
});

test('can create a new empty locally-stored mood vault', async ({ page }) => {
  await fakeLogin(page);
  await expect(page.getByRole('heading', {level: 1})).toHaveText("Your mood diary");
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
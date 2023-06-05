import { test, expect } from '@playwright/test';
import fakeLogin from '$tests/support/FakeLogin';

test('can logout', async ({ page }) => {
  await fakeLogin(page);
  await expect(page.getByRole("link", {name: "Logout"})).toHaveCount(1);
  await page.getByRole("link", {name: "Logout"}).click();
  await expect(page.getByRole("link", {name: "Logout"})).toHaveCount(0);
});
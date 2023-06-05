import type { Page } from "@playwright/test";

export default async function fakeLogin(page: Page) {
    await page.goto('/login?enableTest=1');

    const providerSelector = page.getByLabel("Provider");
    await providerSelector.selectOption("Local storage");

    const pwdBox = page.getByLabel("Password");
    await pwdBox.fill("password");
    await pwdBox.press('Enter');
}
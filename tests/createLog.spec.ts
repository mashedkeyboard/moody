import { moods } from '$lib/MoodLibrary';
import { LocalStorageStore } from '$lib/stores/LocalStorageStore';
import { Crypt } from '$lib/util/Crypt';
import { test, expect } from '@playwright/test';
import fakeLogin from '$tests/support/FakeLogin';

test.beforeEach(async ({page}) => await fakeLogin(page));

test('can click mood to get log page', async ({ page }) => {
    const mood = page.getByText("😭");
    await expect(mood).toBeVisible();
    await mood.click();
    await expect(page.getByRole("heading", {level: 1})).toHaveText("What's got you feeling 😭?");
});

test('can log on log page', async ({ page, context }) => {
    const mood = page.getByText("😭");
    await mood.click();
    await page.getByRole("textbox").fill("test text");
    await page.getByRole("button").click();

    let storedIndex = (await context.storageState()).origins[0].localStorage.find(s => s.name == "index");
    await expect(storedIndex?.name).toEqual("index");
    let crypt = new Crypt("password");
    let index = LocalStorageStore.deserializeIndex(crypt.decrypt(storedIndex!.value));
    let now = new Date();
    await expect(index[now.getFullYear()]).toBeTruthy();
    await expect(index[now.getFullYear()][now.getMonth()].length).toEqual(1);
    await expect(index[now.getFullYear()][now.getMonth()][0].mood).toEqual(moods.find(m => m.id == 1));
    await expect(index[now.getFullYear()][now.getMonth()][0].description).toEqual("test text");
});
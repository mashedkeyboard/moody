import { MoodLog } from '$lib/models/MoodLog';
import { moods } from '$lib/MoodLibrary';
import { LocalStorageStore } from '$lib/stores/LocalStorageStore';
import { Crypt } from '$lib/util/Crypt';
import { test, expect } from '@playwright/test';
import fakeLogin from '$tests/support/FakeLogin';

let crypt = new Crypt("password");
let logWithDesc : MoodLog;

test.beforeEach(async ({ page }) => {
    await page.goto('/');

    logWithDesc = MoodLog.newFromMetadata({
        id: 'test-id-2',
        date: new Date(2021, 10, 5),
        mood: 1
    });
    logWithDesc.description = "test mood description goes in here";

    let startingStorage = crypt.encrypt(LocalStorageStore.serializeIndex({
        "2020": {
            "11": [MoodLog.newFromMetadata({
                id: 'test-id',
                date: new Date(2020, 11, 3),
                mood: 5
            })]
        },
        "2021": {
            "10": [logWithDesc]
        }
    }));

    await page.evaluate((startingStorage) => {
        localStorage.setItem("index", startingStorage)
    }, startingStorage);

    await fakeLogin(page);

    await page.getByRole("link", {name: "Moods"}).click();
});

test('shows mood list title', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toHaveText("Mood history");
});

test('shows individual moods', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 2 })).toHaveCount(2);
    await expect(page.getByRole('heading', { level: 2 }).first()).toHaveText("2020");
    await expect(page.getByRole('heading', { level: 2 }).last()).toHaveText("2021");
    await expect(page.getByRole('heading', { level: 3 })).toHaveCount(2);
    await expect(page.getByRole('heading', { level: 3 }).first()).toHaveText("December");
    await expect(page.getByRole('heading', { level: 3 }).last()).toHaveText("November");
    await expect(page.getByText("test mood description goes in here")).toHaveCount(1);
});

test('moods can be deleted', async ({ page }) => {
    let hasDialog = false;
    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual("Are you sure you want to delete Friday's mood?");
        dialog.accept();
        hasDialog = true;
    });
    await page.getByTestId("delete_" + logWithDesc.getID()).click();
    expect(await(page.getByText("test mood description goes in here").count())).toBe(0);
    await expect(hasDialog).toBeTruthy();
});

test('moods can be attempted to be deleted, then have their deletion cancelled on confirmation', async ({ page }) => {
    let hasDialog = false;
    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual("Are you sure you want to delete Friday's mood?");
        dialog.dismiss();
        hasDialog = true;
    });
    await page.getByTestId("delete_" + logWithDesc.getID()).click();
    await expect(page.getByText("test mood description goes in here")).toBeTruthy();
    await expect(hasDialog).toBeTruthy();
});
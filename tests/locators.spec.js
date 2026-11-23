import { test, expect } from '@playwright/test';

test('Login', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
    await page.getByLabel('Password').fill('SuperSecretPassword!');
    await page.getByRole('button', { name: ' Login' }).click();

    await expect(page).toHaveURL('https://the-internet.herokuapp.com/secure');
    await expect(page.getByRole('heading', { name: "Secure Area", exact: true})).toBeVisible();
    await expect(page.getByText('You logged into a secure area!')).toBeVisible();
});


test('Complex locators', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/challenging_dom');
    await page.locator('tbody tr', { hasText: "Iuvaret5" }).locator('a', { hasText: "delete" }).click();
    await page.locator('tbody tr').nth(2).locator('a').first().click();
});


test('iframe', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/iframe');
    const frame = page.frameLocator('#mce_0_ifr');
    await frame.locator('#tinymce').fill('test');
});


test('shadowdom', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/shadowdom');
    await expect(page.locator('span[slot="my-text"]')).toHaveText("Let's have some different text!");
});


test('dragAndDrop', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/drag_and_drop');
    const columnA = page.locator('#column-a');
    const columnB = page.locator('#column-b');
    await columnA.dragTo(columnB);
});


test('upload', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/upload');
    await page.locator('#file-upload').setInputFiles('resources/IMG_9318.jpg');
    await page.getByRole('button', { name: 'Upload' }).click();

    await expect(page.locator('#uploaded-files')).toHaveText('IMG_9318.jpg');
});


test('download', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/download');
    const downloadPromise = page.waitForEvent('download');
    await page.getByText('Images.txt').click();
    const download = await downloadPromise;
    await download.saveAs('./downloads/' + download.suggestedFilename());
});


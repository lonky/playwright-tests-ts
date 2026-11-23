import { test, expect } from '@playwright/test';


test('Open new tab', async ({ page, context }) => {
    await page.goto('https://the-internet.herokuapp.com/windows');

    const pagePromise = context.waitForEvent('page');
    await page.getByRole('link', { name: 'Click Here'}).click();
    const newPage = await pagePromise;

    await expect(newPage.getByRole('title', { name: 'New Window'}));
});

test('Click hover image', async ({ page, context }) => {
    await page.goto('https://the-internet.herokuapp.com/hovers');
    await page.getByRole('img', { name: 'User Avatar' }).nth(1).hover();
    await page.getByRole('link', { name: 'View profile'}).click();

    await expect(page.url()).toContain('users/2');
});

test('Press Tab key', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/key_presses');
    await page.keyboard.press('Control');

    await expect(page.locator('[id=result]')).toContainText('CONTROL');
});

test('Drag n Drop', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/drag_and_drop');
    await page.dragAndDrop('#column-a', '#column-b');

    await expect(page.locator('[id="column-a"]')).toHaveText('B');
    await expect(page.locator('[id="column-b"]')).toHaveText('A');
});

test('File upload', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/upload');
    await page.locator('[id=file-upload]').setInputFiles('README.md');
    await page.getByRole('button', { name: 'Upload'}).click();

    await expect(page.locator('[id="uploaded-files"]')).toHaveText('README.md');
});

test('Confirm JS', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    page.on('dialog', dialog => dialog.accept());
    await page.getByRole('button', { name: 'Click for JS Confirm'}).click();

    await expect(page.locator('[id="result"]')).toHaveText('You clicked: Ok');
});

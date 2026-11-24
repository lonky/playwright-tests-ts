import { test, expect } from "@playwright/test";

test('Logged page is opened @smoke', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/secure');

    await expect(page.getByRole('heading', { name: "Secure Area", exact: true})).toBeVisible();
    await expect(page.getByText('Welcome to the Secure Area. When you are done click logout below.')).toBeVisible();
});

test('Complex locators', { tag: '@locators' }, async ({ page }) => {
    test.setTimeout(40000);
    await page.goto('https://the-internet.herokuapp.com/challenging_dom');
    await page.locator('tbody tr', { hasText: "Iuvaret5" }).locator('a', { hasText: "delete" }).click();
    await page.locator('tbody tr').nth(2).locator('a').first().click();
});

test.describe('describe block', () => {
    test('Complex locators', async ({ page }) => {
        test.setTimeout(40000);
        await page.goto('https://the-internet.herokuapp.com/challenging_dom');
        await page.locator('tbody tr', { hasText: "Iuvaret5" }).locator('a', { hasText: "delete" }).click();
        await page.locator('tbody tr').nth(2).locator('a').first().click();
    });
});

const loginCases = [
    {userName: 'tomsmith', password: 'SuperSecretPassword!', expected: 'You logged into a secure area!'},
    {userName: 'tomsmith', password: 'wrongPassword!', expected: 'Your password is invalid!'},
    {userName: '123', password: 'SuperSecretPassword!', expected: 'Your username is invalid!'},
]

loginCases.forEach(({userName, password, expected}) => {
    test(`login ${userName} ${password}`, async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/login');
        await page.getByRole('textbox', { name: 'Username' }).fill(userName);
        await page.getByLabel('Password').fill(password);
        await page.getByRole('button', { name: ' Login' }).click();

        await expect(page.locator('#flash')).toContainText(expected);
    })
});

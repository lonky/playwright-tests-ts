import { test, expect } from '@playwright/test';


test('Check products sorting from Z to A', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[id="user-name"]').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await page.getByRole('combobox').selectOption('za');

    await expect(page.locator('[data-test="item-3-title-link"]')).toHaveText('Test.allTheThings() T-Shirt (Red)');
});


test('Check slider catalog', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[id="user-name"]').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.locator('[id="dynamic_catalog_sidebar_link"]').click();
    await page.locator('[id="dynamic_catalog_slider_link"]').click();
    
    await expect(page.locator('[data-test="dynamic-catalog-slider-dots"]')).toHaveScreenshot();
});


test('Add two items to the cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[id="user-name"]').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await page.context().tracing.start({ screenshots:true, snapshots: true });

    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await page.locator('#add-to-cart-sauce-labs-bike-light').click();
    await page.locator('[data-test="shopping-cart-link"]').click();

    await page.context().tracing.stop({ path: 'trace.zip' });

    await expect(page.locator('.cart_list .cart_item')).toHaveCount(2);
});

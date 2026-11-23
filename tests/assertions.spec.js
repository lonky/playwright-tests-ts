import { test, expect } from '@playwright/test';


test('Assertion test 1', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();


  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();
  await expect(page.locator('[data-test="inventory-item"]').first()).toBeVisible();
  await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);
  await expect(page.locator('[data-test="inventory-item"] [id*="add-to-cart"]').nth(0)).toBeVisible();
});
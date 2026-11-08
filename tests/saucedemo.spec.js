import { test, expect } from '@playwright/test';

test('[E2E] Purchasing 2 items', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[id="user-name"]').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();
  await page.locator('#add-to-cart-sauce-labs-backpack').click();
  await page.locator('#add-to-cart-sauce-labs-bike-light').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  
  await expect(page.locator('.cart_list .cart_item')).toHaveCount(2);

  await page.locator('#checkout').click();
  await page.locator('#first-name').fill('John');
  await page.locator('#last-name').fill('Doe');
  await page.locator('#postal-code').fill('12345');
  await page.locator('#continue').click();

  await expect(page.locator('.cart_list .cart_item')).toHaveCount(2);
  await expect(page.locator('[data-test="payment-info-label"]')).toBeVisible();
  await expect(page.locator('[data-test="payment-info-value"]')).toContainText('Card');
  await expect(page.locator('[data-test="shipping-info-label"]')).toBeVisible();
  await expect(page.locator('[data-test="total-info-label"]')).toBeVisible();

  await page.locator('#finish').click();
  await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
  await expect(page.locator('#back-to-products')).toBeVisible();
  await expect(page.locator('#generate-pdf-order')).toBeVisible();
});

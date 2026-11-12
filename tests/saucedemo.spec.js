import { test, expect } from '@playwright/test';

test('[E2E] Purchasing 2 items', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[id="user-name"]').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  const productsItemPrice1 = parseFloat((await page.locator('.inventory_item_price').nth(0).textContent()).replace('$', ''));
  const productsItemPrice2 = parseFloat((await page.locator('.inventory_item_price').nth(1).textContent()).replace('$', ''));
  const productsTotalPrice = productsItemPrice1 + productsItemPrice2;

  await page.locator('#add-to-cart-sauce-labs-backpack').click();
  await page.locator('#add-to-cart-sauce-labs-bike-light').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  

  await expect(page.locator('.cart_list .cart_item')).toHaveCount(2);

  const cartItemPrice1 = parseFloat((await page.locator('.inventory_item_price').nth(0).textContent()).replace('$', ''));
  const cartItemPrice2 = parseFloat((await page.locator('.inventory_item_price').nth(1).textContent()).replace('$', ''));

  await expect(productsItemPrice1).toEqual(cartItemPrice1);
  await expect(productsItemPrice2).toEqual(cartItemPrice2);


  await page.locator('#checkout').click();
  await page.locator('#first-name').fill('John');
  await page.locator('#last-name').fill('Doe');
  await page.locator('#postal-code').fill('12345');
  await page.locator('#continue').click();


  await expect(page.locator('.cart_list .cart_item')).toHaveCount(2);

  const overviewItemPrice1 = parseFloat((await page.locator('.inventory_item_price').nth(0).textContent()).replace('$', ''));
  const overviewItemPrice2 = parseFloat((await page.locator('.inventory_item_price').nth(1).textContent()).replace('$', ''));
  const overviewSumPrices = overviewItemPrice1 + overviewItemPrice2;
  const overviewItemsTotalPrices = parseFloat((await page.locator('.summary_subtotal_label').textContent()).replace('Item total: $', ''));
  const taxPrice = parseFloat((await page.locator('.summary_tax_label').textContent()).replace('Tax: $', ''));
  const totalPrice = parseFloat((await page.locator('.summary_total_label').textContent()).replace('Total: $', ''));

  await expect(overviewItemPrice1).toEqual(productsItemPrice1);
  await expect(overviewItemPrice2).toEqual(productsItemPrice2);
  await expect(overviewSumPrices).toEqual(productsTotalPrice);
  await expect(overviewSumPrices).toEqual(overviewItemsTotalPrices);
  await expect(overviewSumPrices).toEqual(productsTotalPrice);
  await expect(overviewSumPrices + taxPrice).toEqual(totalPrice);
  await expect(page.locator('[data-test="payment-info-label"]')).toBeVisible();
  await expect(page.locator('[data-test="payment-info-value"]')).toContainText('Card');
  await expect(page.locator('[data-test="shipping-info-label"]')).toBeVisible();
  await expect(page.locator('[data-test="total-info-label"]')).toBeVisible();


  await page.locator('#finish').click();


  await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
  await expect(page.locator('#back-to-products')).toBeVisible();
  await expect(page.locator('#generate-pdf-order')).toBeVisible();
});


test('[Codegen] Remove items from the Cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();

  await expect(page.locator('.cart_list .cart_item')).toHaveCount(2);

  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
  await page.locator('[data-test="remove-sauce-labs-bolt-t-shirt"]').click();
  await page.reload();

  await expect(page.locator('.cart_list .cart_item')).toHaveCount(0);
});

import { test, expect } from '@playwright/test';

test('A sample test that adds an item to cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/inventory/);

  const addToCart = (page, productName) =>
    page.locator('[data-test="inventory-item"]')
        .filter({ hasText: productName })
        .getByRole('button', { name: 'Add to cart' })
        .click();

  await addToCart(page, 'Sauce Labs Backpack');
  await addToCart(page, 'Sauce Labs Bike Light');
  await addToCart(page,'Sauce Labs Bolt T-Shirt');


});


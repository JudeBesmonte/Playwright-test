import { test, expect } from '@playwright/test';

test('A sample test that adds an item to cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/inventory/);

  // 1. find the card for this product
  const backpackCard = page.locator('[data-test="inventory-item"]').filter({ hasText: 'Sauce Labs Backpack' });
  const blackshirtCart = page.locator('[data-test="inventory-item]').filter({ hasText:'Sauce Labs Bolt T-Shirt'});
  // 2. click the button inside that card only
  await backpackCard.getByRole('button', { name: 'Add to cart' }).click();
  await blackshirtCart.getByRole('button', { name: 'Add to cart' }).click();
  // 3. verify it worked
  await expect(backpackCard.getByRole('button', { name: 'Remove' })).toBeVisible();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
});
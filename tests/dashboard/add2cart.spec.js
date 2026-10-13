import { test, expect } from '@playwright/test';

test('A sample test that adds an item to cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/inventory/);
  // await page.getByRole ('button', {name:'Sauce Labs Backpack'},).first().click();
  // await page.getByRole ('button', {name:'Add to cart'}).click();
  await page.getByRole ('button', {name:'Add to cart'}).nth(2).click();

  //check-out order
  await page.getByRole ('button', {name:'shopping_cart_link'}).click();
});
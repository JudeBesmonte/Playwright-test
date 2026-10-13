// import { test, expect } from '@playwright/test';

// test('invalid user cant log in', async ({ page }) => {
//     await page.goto('https://www.saucedemo.com');
//     await page.getByPlaceholder('Username').fill('standard_user');
//     await page.getByPlaceholder('Password').fill('123456');
//     await page.getByRole('button', { name: 'Login' }).click();

//   });

const { test, expect } = require('@playwright/test');

test('invalid password shows error', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('123456');
  await page.getByRole('button', { name: 'Login' }).click();

  const error = page.locator('[data-test="error"]');
  await expect(error).toBeVisible();
  await expect(error).toContainText('Username and password do not match');
  await expect(page).toHaveURL('https://www.saucedemo.com/'); // still on the login page
});

test('locked out user shows locked out error', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.getByPlaceholder('Username').fill('locked_out_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  const error = page.locator('[data-test="error"]');
  await expect(error).toBeVisible();
  await expect(error).toContainText('this user has been locked out');
});
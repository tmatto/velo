import { test, expect } from '@playwright/test';

test('a webapp deve estar online', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await expect(page).toHaveTitle(/Velô by Papito/);
});

test('webapp deve ter o header', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await expect(page.getByTestId('header')).toBeVisible();
});

test('webapp deve ter o footer', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await expect(page.getByTestId('footer')).toBeVisible();
});
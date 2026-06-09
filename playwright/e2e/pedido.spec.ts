import { test, expect } from '@playwright/test';

const ORDER_ID = 'VLO-6GTS89';

test('deve consultar um pedido', async ({ page }) => {
  // Arrange
  await page.goto('http://localhost:5173/');
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');

  // Act
  await page.getByRole('link', { name: 'Consultar Pedido' }).click();
  await page.getByTestId('search-order-id').fill(ORDER_ID);
  await page.getByTestId('search-order-button').click();

  // Assert
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido');
  await expect(page.getByTestId('order-result-id')).toContainText(ORDER_ID);
  await expect(page.getByTestId('order-result-status')).toContainText('APROVADO');
});

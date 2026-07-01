import { test, expect } from '@playwright/test'

const ORDER_ID = 'VLO-6GTS89'

test('deve consultar um pedido', async ({ page }) => {
  // Arrange
  await page.goto('http://localhost:5173/')
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

  // Act
  await page.getByRole('link', { name: 'Consultar Pedido' }).click()
  await page.getByTestId('search-order-id').fill(ORDER_ID)
  await page.getByTestId('search-order-button').click()

  // Assert
  const containerPedido = page.getByRole('paragraph')
    .filter({ hasText: /^Pedidos$/ })
    .locator('..') // Sobe para o elemento pai (a div que agrupa ambos)

await expect(containerPedido).toContainText(ORDER_ID)

  await expect(page.getByText('APROVADO')).toBeVisible();
})

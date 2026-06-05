import { test, expect } from '@playwright/test'

test('deve consultar um pedido', async ({ page }) => {
  await page.goto('http://localhost:5173/')
  await page.getByRole('link', { name: 'Consultar Pedido' }).click()
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')
  await page.getByTestId('search-order-id').click()
  await page.getByTestId('search-order-id').click()
  await page.getByTestId('search-order-id').fill('VLO-6GTS89')
  await page.getByTestId('search-order-button').click()
  await expect(page.getByTestId('order-result-id')).toContainText('VLO-6GTS89')
})
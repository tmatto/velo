import { test, expect } from '@playwright/test'
import { generateOrderCode } from '../support/helpers.ts'

test.describe('Consultar Pedido', () => {

  test.beforeEach(async ({ page }) => {
    // Arrange
    await page.goto('http://localhost:5173/')
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

    await page.getByRole('link', { name: 'Consultar Pedido' }).click()
    await expect(page.getByRole('heading', { name: 'Consultar Pedido' })).toBeVisible()
  })



  test('deve consultar um pedido aprovado', async ({ page }) => { 

    // data teste 
    //const ORDER_ID = 'VLO-6GTS89'
    //const STATUS = 'APROVADO'

     // data teste 
     const order = {
      number: 'VLO-6GTS89',
      status: 'APROVADO',
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      custumer:{
        name: 'Thiago Matto',
        email: 'tmatto@dev.com',
      },
      payment: 'À Vista'
    }

    // Act
    await page.getByTestId('search-order-id').fill(order.number)
    await page.getByTestId('search-order-button').click()

    // Assert
    //const containerPedido = page.getByRole('paragraph')
    //  .filter({ hasText: /^Pedido$/ })
    //  .locator('..') // Sobe para o elemento pai (a div que agrupa ambos)

    //await expect(containerPedido).toContainText(ORDER_ID)
    //await expect(page.getByText(STATUS)).toBeVisible();


    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - img
      - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.custumer.name}
      - paragraph: Email
      - paragraph: ${order.custumer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);
  })


  test('deve consultar um reprovado', async ({ page }) => { 

    // data teste 
    const order = {
      number: 'VLO-ILX0TD',
      status: 'REPROVADO',
      color: 'Glacier Blue',
      wheels: 'aero Wheels',
      custumer:{
        name: 'Guilherme Matto',
        email: 'guimatto@dev.com',
      },
      payment: 'À Vista'
    }

    // Act
    await page.getByTestId('search-order-id').fill(order.number)
    await page.getByTestId('search-order-button').click()

    // Assert
    //const containerPedido = page.getByRole('paragraph')
    //  .filter({ hasText: /^Pedido$/ })
    //  .locator('..') // Sobe para o elemento pai (a div que agrupa ambos)

    //await expect(containerPedido).toContainText(ORDER_ID)
    //await expect(page.getByText(STATUS)).toBeVisible();


    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - img
      - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.custumer.name}
      - paragraph: Email
      - paragraph: ${order.custumer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);
  })

  test('deve exibir menssagem de erro ao consultar um pedido inexistente', async ({ page }) => {

    // data teste 
    const ORDER_ID = generateOrderCode()

    // Act
    await page.getByTestId('search-order-id').fill(ORDER_ID)
    await page.getByTestId('search-order-button').click()

    // Assert
    await expect(page.locator('#root')).toMatchAriaSnapshot(`
        - img
        - heading "Pedido não encontrado" [level=3]
        - paragraph: Verifique o número do pedido e tente novamente
        `)
  })

})
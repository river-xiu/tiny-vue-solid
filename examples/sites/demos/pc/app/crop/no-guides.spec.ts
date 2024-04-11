import { test, expect } from '@playwright/test'

test('不显示虚线', async ({ page }) => {
  page.on('pageerror', (exception) => expect(exception).toBeNull())
  await page.goto('crop#no-guides')
  await page.getByRole('button', { name: '图片裁剪' }).click()
  await page.locator('div:nth-child(8) > .tiny-svg').click()
})

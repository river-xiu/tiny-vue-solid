import { expect, test } from '@playwright/test'

test('下拉表格远程搜索基础用法', async ({ page }) => {
  page.on('pageerror', (exception) => expect(exception).toBeNull())
  await page.goto('select#nest-grid-remote-single')

  const wrap = page.locator('#nest-grid-remote-single')
  const select = wrap.locator('.tiny-select').nth(0)
  const input = select.locator('.tiny-input__inner')
  const dropdown = page.locator('body > .tiny-select-dropdown')
  const suffixSvg = dropdown.locator('.tiny-input__suffix .tiny-select__caret')

  await expect(suffixSvg).toBeHidden()
  await expect(dropdown).toBeHidden()
  await input.focus()
  await input.fill(' ')
  await input.press('Enter')
  await page.waitForTimeout(200)
  await expect(dropdown).toBeVisible()
  await expect(dropdown.locator('.tiny-grid__body tbody')).toBeEmpty()
  await input.fill('')
  await input.press('Enter')
  await page.waitForTimeout(200)
  await expect(dropdown.locator('.tiny-grid__body tbody')).not.toBeEmpty()
  await page.getByRole('row', { name: '5100000' }).locator('div').first().click()
  await expect(input).toHaveValue('5100000')
  await input.click()
  await expect(page.getByRole('row', { name: '5100000' })).toHaveClass(/row__current/)
  await page.getByRole('row', { name: '5900003' }).locator('div').first().click()
  await expect(input).toHaveValue('5900003')
  await input.click()
  await expect(page.getByRole('row', { name: '5900003' })).toHaveClass(/row__current/)
})

test('下拉表格远程搜索 + 自动搜索 + 显示按钮', async ({ page }) => {
  page.on('pageerror', (exception) => expect(exception).toBeNull())
  await page.goto('select#nest-grid-remote-single')

  const wrap = page.locator('#nest-grid-remote-single')
  const select = wrap.locator('.tiny-select').nth(1)
  const input = select.locator('.tiny-input__inner')
  const dropdown = page.locator('body > .tiny-select-dropdown')
  const suffixSvg = select.locator('.tiny-input__suffix .tiny-select__caret')

  await expect(suffixSvg).toBeVisible()
  await expect(dropdown).toBeHidden()
  await input.click()
  await expect(dropdown).toBeVisible()
  await expect(dropdown.locator('.tiny-grid__body tbody')).not.toBeEmpty()
  await page.getByRole('row', { name: '5100000' }).getByRole('cell').first().click()
  await expect(input).toHaveValue('5100000')
  await input.click()
  await expect(page.getByRole('row', { name: '5100000' })).toHaveClass(/row__current/)
  await page.getByRole('row', { name: '5900003' }).getByRole('cell').first().click()
  await expect(input).toHaveValue('5900003')
  await input.click()
  await expect(page.getByRole('row', { name: '5900003' })).toHaveClass(/row__current/)
  await input.fill(' ')
  await input.press('Enter')
  await expect(dropdown).toBeVisible()
  await expect(dropdown.locator('.tiny-grid__body tbody')).toBeEmpty()
})
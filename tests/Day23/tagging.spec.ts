import { test, expect } from '@playwright/test';

// 1 Run only sanity tag
// npx playwright test tagging.spec.ts --headed --grep="@sanity"

// 2 Run only regression tag
// npx playwright test tagging.spec.ts --headed --grep="@regression"

// 3 Run test belongs to Sanity and Regression both
// npx playwright test tagging.spec.ts --headed --grep="(?=.*@sanity)(?=.*@regression)"

// 4 Run belongs to Sanity or Regression
// npx playwright test tagging.spec.ts --headed --grep="@sanity|@regression"

// 5 Run sanity test not regression
//npx playwright test tagging.spec.ts --headed --grep="@sanity" --grep-invert="@regression"

test('@sanity Check the title of the page', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await expect(page).toHaveTitle('Google');
});

test('@regression Check the URL of the page', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await expect(page).toHaveURL(/google/);
});

test('Check the title of the store page', { tag: '@regression' }, async ({ page }) => {
  await page.goto('https://www.google.com/');
  await page.locator('.w5hRs').last().click();
  await expect(page).toHaveTitle('Google Store for Google Made Devices & Accessories');
});

test('Check the text of the store page', { tag: ['@regression', '@sanity'] }, async ({ page }) => {
  await page.goto('https://www.google.com/');
  await page.locator('.w5hRs').last().click();
  await expect(page.getByText('Shop popular categories.')).toBeVisible();
});
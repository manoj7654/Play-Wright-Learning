/*
Playwright can be used to test your application for many types of Accessibility issue

Example:
   Missing or improper ALT text for images
   Poor Color contrast
   Missing Form Labels
   Keyboard Navigation Issue

Every website should follow WCAG guidlines:
    - Web content accessiblity

Install @axe-core/playwright

https://www.npmjs.com/package/@axe-core/playwright

WCAG Reference: https://www.w3.org/WAI/standards-guidlines/wcag/

Practice Demo: https://we.org

*/

import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Testing', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://sdetqa.vercel.app/accessibility_test_app')
    })

    test('Basic Accessibility Scan', async ({ page }) => {
        const results = await new AxeBuilder({ page }).analyze();
        expect(results.violations).toEqual([]);
    });

    test('Print Accessibility Violations', async ({ page }) => {
        const results = await new AxeBuilder({ page }).analyze();

        for (let item of results.violations) {
            console.log(`\nRule:${item.id}`);
            console.log(`Impact:${item.impact}`);
            console.log(`Description:${item.description}`);
        }
    });

    test('Scan Login Form', async ({ page }) => {
        const results = await new AxeBuilder({ page })
            .include('#section-login')
            .analyze();

        console.log(results.violations)
        //expect(results.violations).toEqual([]);
    });

    test('Exclude Footer', async ({ page }) => {
        const results = await new AxeBuilder({ page })
            .exclude('.footer')
            .exclude('.ad-banner')
            .analyze();

        console.log(results.violations)
        //expect(results.violations).toEqual([]);
    });


    test('Disable Individual Accessibility Rules', async ({ page }) => {
        const results = await new AxeBuilder({ page })
            .disableRules([
                'color-contrast',
                'image-alt'
            ])
            .analyze();

        console.log(results.violations);
    });

    test('Export Accessibility Report', async ({ page }, testInfo) => {
        const results = await new AxeBuilder({ page }).analyze();

        await testInfo.attach('Accessibility Report', {
            body: JSON.stringify(results, null, 2),
            contentType: 'application/json'
        });
    });
})
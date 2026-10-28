# Accessibility Testing in Playwright

## What is Accessibility Testing?

Accessibility Testing (also called A11y Testing) ensures that a web
application can be used by everyone, including people with disabilities.
It helps identify accessibility issues such as missing labels, poor
keyboard navigation, incorrect HTML structure, missing ARIA attributes,
and low color contrast.

Playwright integrates with Axe-core, a popular accessibility testing
library, allowing you to perform automated accessibility scans as part
of your Playwright tests.

## Why Accessibility Testing?

Accessibility testing helps you: - Build applications that everyone can
use. - Detect accessibility issues early. - Improve user experience. -
Meet WCAG (Web Content Accessibility Guidelines). - Support government
and enterprise accessibility requirements.

## Common Accessibility Issues

-   Images without alt text
-   Buttons without accessible names
-   Form fields without labels
-   Incorrect heading hierarchy
-   Poor keyboard navigation
-   Missing ARIA attributes
-   Low color contrast

## Install Axe-core

Install the Playwright Axe package:

``` bash
npm install @axe-core/playwright
```

## Import AxeBuilder

``` typescript
import AxeBuilder from '@axe-core/playwright';
```

## Learning Sequence

Follow these examples in order. Each example introduces one new concept
while building on the previous one.

1.  Basic Accessibility Scan
2.  Print Accessibility Violations
3.  Scan a Specific Section
4.  Exclude a Section
5.  Scan for Specific WCAG Violations
6.  Disable Individual Scan Rules
7.  Export Scan Results as a Test Attachment

------------------------------------------------------------------------

## 1. Basic Accessibility Scan

**Objective:** Learn how to scan an entire web page for accessibility
issues.

``` typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('Basic Accessibility Scan', async ({ page }) => {
  await page.goto('https://example.com');

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});
```

**Explanation** - Opens the web application. - Scans the entire page. -
Returns all accessibility violations. - Fails the test if any violations
are found.

This is the simplest and most commonly used accessibility test.

## 2. Print Accessibility Violations

**Objective:** Learn how to inspect accessibility issues before
validating them.

``` typescript
import { test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('Print Accessibility Violations', async ({ page }) => {
  await page.goto('https://example.com');

  const results = await new AxeBuilder({ page }).analyze();

  console.log(results.violations);
});
```

**Explanation**

Instead of failing immediately, this example prints all detected
accessibility issues.

Each violation contains information such as: - Rule ID - Impact -
Description - Help URL - Affected HTML elements

This helps developers understand what needs to be fixed.

## 3. Scan a Specific Section

**Objective:** Learn how to scan only a particular section of a page.

``` typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('Scan Login Form', async ({ page }) => {
  await page.goto('https://example.com');

  const results = await new AxeBuilder({ page })
    .include('#login-form')
    .analyze();

  expect(results.violations).toEqual([]);
});
```

**Explanation** - Scans only the Login Form. - Ignores the remaining
page content. - Useful for component-level accessibility testing.

## 4. Exclude a Section

**Objective:** Learn how to ignore specific page sections during
accessibility testing.

``` typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('Exclude Footer', async ({ page }) => {
  await page.goto('https://example.com');

  const results = await new AxeBuilder({ page })
    .exclude('footer')
    .analyze();

  expect(results.violations).toEqual([]);
});
```

**Explanation** - Excludes the footer from the scan. - Scans the
remaining page content. - Useful when certain sections are maintained
separately or temporarily excluded.

## 5. Scan for Specific WCAG Violations

**Objective:** Learn how to validate compliance with selected WCAG
standards.

``` typescript
import { test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('Scan WCAG 2.1 AA Rules', async ({ page }) => {
  await page.goto('https://example.com');

  const results = await new AxeBuilder({ page })
    .withTags([
      'wcag2a',
      'wcag2aa',
      'wcag21aa'
    ])
    .analyze();

  console.log(results.violations);
});
```

**Explanation**

Instead of checking every available Axe rule, this example scans only
the selected WCAG standards. This helps when your project needs to
comply with a specific accessibility guideline.

## 6. Disable Individual Scan Rules

**Objective:** Learn how to skip specific accessibility rules.

``` typescript
import { test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('Disable Individual Accessibility Rules', async ({ page }) => {
  await page.goto('https://example.com');

  const results = await new AxeBuilder({ page })
    .disableRules([
      'color-contrast',
      'landmark-one-main'
    ])
    .analyze();

  console.log(results.violations);
});
```

**Explanation** - Runs the accessibility scan. - Skips the specified
rules. - Useful when a rule is not applicable or is handled separately.

**Note:** Disable rules only when there is a valid business or technical
reason. Avoid disabling rules simply to make tests pass.

## 7. Export Scan Results as a Test Attachment

**Objective:** Learn how to attach the accessibility report to the
Playwright HTML report.

``` typescript
import { test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('Export Accessibility Report', async ({ page }, testInfo) => {
  await page.goto('https://example.com');

  const results = await new AxeBuilder({ page }).analyze();

  await testInfo.attach('Accessibility Report', {
    body: JSON.stringify(results, null, 2),
    contentType: 'application/json'
  });
});
```

**Explanation** - Performs the accessibility scan. - Converts the scan
results into JSON format. - Attaches the report to the Playwright HTML
report. - Makes accessibility reports available for debugging and CI/CD
pipelines.

## Best Practices

-   Run accessibility scans after the page has fully loaded.
-   Use semantic HTML elements (`button`, `header`, `main`, `nav`,
    etc.).
-   Prefer Playwright's `getByRole()` locators.
-   Fix Critical and Serious accessibility issues first.
-   Include accessibility tests in your CI/CD pipeline.
-   Review accessibility reports regularly.
-   Combine automated accessibility testing with manual accessibility
    testing.

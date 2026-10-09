# 📊 Playwright Reporters

## 🎯 What are Playwright Reporters?

Playwright Reporters are used to display and format the results of your
test execution.

After running your Playwright tests, reporters help you understand:

-   ✅ Which tests passed
-   ❌ Which tests failed
-   ⏭️ Which tests were skipped
-   ⏱️ Test execution time
-   📸 Screenshots (if configured)
-   🎥 Videos (if configured)
-   📄 Trace files (if configured)
-   📈 Test execution summary

Think of reporters as different ways of presenting the same test
results.

## 🏗️ Types of Playwright Reporters

Playwright supports several built-in reporters:

  Reporter    Purpose
  ----------- -------------------------------------
  🌐 HTML     Browser-based interactive report
  📃 List     Detailed console output (default)
  📏 Line     Compact single-line output
  ⚫ Dot      Minimal terminal output
  📄 JSON     Machine-readable JSON report
  📑 JUnit    XML report for Jenkins and CI tools
  🛠️ Custom   Build your own reporter

## 🌐 1. HTML Reporter

### 📖 What is HTML Reporter?

The HTML Reporter generates an interactive and visually rich report that
opens in your browser. It is commonly used because it is easy to
understand and contains detailed information about every test.

### ✅ HTML Report Includes

-   Passed tests
-   Failed tests
-   Skipped tests
-   Execution time
-   Screenshots
-   Videos
-   Trace files
-   Error messages
-   Summary charts

### 📌 Default Behavior

By default, Playwright creates an HTML report after execution and
automatically opens it only if a test fails.

### ⚙️ Control When the Report Opens

  Option                 Behaviour
  ---------------------- ---------------------------------------
  `open: 'never'`        Never open automatically
  `open: 'always'`       Always open after execution
  `open: 'on-failure'`   Open only when a test fails (default)

### 📝 Configuration Example

``` typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [
    ['html', { open: 'never' }]
  ]
});
```

### 📂 Save Report to a Custom Folder

``` typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [
    ['html', {
      open: 'never',
      outputFolder: 'my-report'
    }]
  ]
});
```

### 👀 View HTML Report

Default folder:

``` bash
npx playwright show-report
```

Custom folder:

``` bash
npx playwright show-report my-report
```

### ▶️ Run Using CLI

``` bash
npx playwright test --reporter=html
```

## 📃 2. List Reporter (Default Reporter)

### 📖 What is List Reporter?

The List Reporter displays one line for every test executed. It is
Playwright's default reporter.

### Example Output

``` text
Running 5 tests

✓ Login Test
✓ Search Product
✘ Payment Test
✓ Logout Test
✓ Register Test
```

### Advantages

-   Easy to read
-   Shows each test individually
-   Good for local development

### Configuration

``` typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: 'list'
});
```

### CLI

``` bash
npx playwright test --reporter=list
```

## 📏 3. Line Reporter

### 📖 What is Line Reporter?

The Line Reporter displays only the latest running test on a single
line. Instead of printing every test, it continuously updates the same
line.

### Example

``` text
Running Login Test...
Running Search Test...
Running Payment Test...
```

Only the latest running test is visible.

### Advantages

-   Cleaner output
-   Less scrolling
-   Useful for medium-sized test suites

### Configuration

``` typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: 'line'
});
```

### CLI

``` bash
npx playwright test --reporter=line
```

## ⚫ 4. Dot Reporter

### 📖 What is Dot Reporter?

The Dot Reporter is the smallest and most compact reporter. Instead of
displaying test names, it prints one symbol per test.

Ideal for:

-   CI/CD pipelines
-   Large automation suites
-   Thousands of test cases

### Example Output

All tests passed:

``` text
··········
```

One test failed:

``` text
····F····
```

Skipped test:

``` text
··°····
```

Retry:

``` text
··×····
```

### Symbol Meaning

  Symbol   Meaning
  -------- --------------------------------------------
  `·`      Passed
  `F`      Failed
  `°`      Skipped
  `×`      Retried (or failed attempt during retries)

### Why Use Dot Reporter?

Its minimal console output makes it useful for Jenkins, Azure DevOps,
GitHub Actions, GitLab CI, and large projects.

### Configuration

``` typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: 'dot'
});
```

### CLI

``` bash
npx playwright test --reporter=dot
```

## 📄 5. JSON Reporter

### 📖 What is JSON Reporter?

The JSON Reporter stores test execution results in JSON format. This is
useful when another application needs to read results programmatically.

Common use cases:

-   Dashboards
-   Analytics
-   Automation scripts
-   Integrations

### Configuration

``` typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [
    ['json', { outputFile: 'results.json' }]
  ]
});
```

### CLI

``` bash
npx playwright test --reporter=json
```

## 📑 6. JUnit Reporter

### 📖 What is JUnit Reporter?

The JUnit Reporter generates test results in XML format. Many CI/CD
tools understand JUnit XML, including Jenkins, Bamboo, TeamCity, and
Azure DevOps.

### Configuration

``` typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [
    ['junit', { outputFile: 'results.xml' }]
  ]
});
```

### CLI

``` bash
npx playwright test --reporter=junit
```

## 🛠️ 7. Custom Reporter

### 📖 What is a Custom Reporter?

Sometimes built-in reporters are not enough. Playwright allows you to
create your own reporter by implementing the Reporter interface.

### Example Custom Reporter

``` typescript
import type {
  FullConfig,
  FullResult,
  Reporter,
  Suite,
  TestCase,
  TestResult
} from '@playwright/test/reporter';

class MyReporter implements Reporter {
  onBegin(config: FullConfig, suite: Suite) {
    console.log(`Starting the run with ${suite.allTests().length} tests`);
  }

  onTestBegin(test: TestCase, result: TestResult) {
    console.log(`Starting test ${test.title}`);
  }

  onTestEnd(test: TestCase, result: TestResult) {
    console.log(`Finished test ${test.title}: ${result.status}`);
  }

  onEnd(result: FullResult) {
    console.log(`Finished the run: ${result.status}`);
  }
}

export default MyReporter;
```

### Use the Custom Reporter

``` typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [
    ['./my-awesome-reporter.ts', {
      customOption: 'some value'
    }]
  ]
});
```

### CLI

``` bash
npx playwright test --reporter="./myreporter/my-awesome-reporter.ts"
```

## 📦 Configure Multiple Reporters Together

Playwright can use multiple reporters in one test execution, for example
console output, HTML, JSON, XML, and custom reports.

``` typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [
    ['list'],
    ['line'],
    ['dot'],
    ['html', {
      open: 'always',
      outputFolder: 'my-reports'
    }],
    ['json', {
      outputFile: 'my-reports/results.json'
    }],
    ['junit', {
      outputFile: 'my-reports/results.xml'
    }],
    ['./tests/utils/CustomReporter.ts', {
      customOption: 'some value'
    }]
  ]
});
```

## 🏆 Generate Allure Reports in Playwright

### 📖 What is Allure Report?

Allure Report is a popular reporting framework used with Playwright. It
provides a modern, interactive dashboard with details about test
execution.

### ✅ Allure Report Features

-   Dashboard and execution statistics
-   Screenshots and videos
-   Trace files
-   Attachments
-   Error details
-   Execution timeline and duration
-   Test history (when configured)
-   Trends across executions

### 🔧 Step 1: Install Allure CLI

``` bash
npm install -g allure-commandline --save-dev
```

After installation, ensure the Allure executable is available in your
system's `PATH` environment variable.

### 🔧 Step 2: Install Allure Playwright Reporter

``` bash
npm install -D allure-playwright
```

This installs the Playwright adapter as a development dependency.

### ⚙️ Step 3: Configure Allure Reporter

Add the reporter to `playwright.config.ts`:

``` typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [
    ['allure-playwright', {
      outputFolder: 'allure-results'
    }]
  ]
});
```

The reporter configuration is an array containing the reporter name and
its options.

### ▶️ Alternative: Use CLI

Without modifying the configuration:

``` bash
npx playwright test --reporter=allure-playwright
```

### 📂 Step 4: Generate HTML Report

After test execution, Allure stores raw results in `allure-results`.

Generate the HTML report:

``` bash
allure generate ./allure-results -o ./allure-report
```

Clean previous reports while generating:

``` bash
allure generate ./allure-results -o ./allure-report --clean
```

### 🌐 Step 5: Open the Report

``` bash
allure open ./allure-report
```

A browser window opens with a detailed Allure report.

### 📊 Allure Report Contains

-   Passed, failed, and skipped tests
-   Summary dashboard
-   Screenshots, videos, trace files (if attached)
-   Attachments and error messages
-   Graphs and charts
-   Timeline view and execution duration
-   Suites and test hierarchy
-   History and trends (when history is preserved)

## 🎯 Which Reporter Should You Use?

  -----------------------------------------------------------------------
  Reporter                            Best For
  ----------------------------------- -----------------------------------
  🌐 HTML                             Everyday local development and
                                      detailed debugging

  📃 List                             Beginners and readable console
                                      output

  📏 Line                             Compact console output during
                                      development

  ⚫ Dot                              Large test suites and CI/CD
                                      pipelines

  📄 JSON                             Integrations, APIs, dashboards, and
                                      automation

  📑 JUnit                            Jenkins, Azure DevOps, Bamboo,
                                      TeamCity, and other CI servers

  🛠️ Custom                           Organization-specific reporting
                                      requirements

  🏆 Allure                           Professional dashboards,
                                      attachments, history, and analytics
  -----------------------------------------------------------------------

## 💡 Key Takeaways

-   Reporters determine how Playwright displays test results.
-   HTML Reporter is popular for day-to-day debugging.
-   List Reporter is the default reporter and prints one line per test.
-   Line Reporter keeps console output compact by updating a single
    line.
-   Dot Reporter is ideal for CI/CD because it produces minimal output.
-   JSON Reporter generates machine-readable results for integrations.
-   JUnit Reporter creates XML reports for CI/CD tools like Jenkins.
-   Custom Reporters let you build reports tailored to your
    organization.
-   Allure Reports provide dashboards, attachments, execution history,
    and analytics.

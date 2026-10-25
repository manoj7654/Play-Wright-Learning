# API Mocking in Playwright

## What is API Mocking?

API Mocking means creating a fake API response instead of calling the
real server.

Instead of sending a request to the actual backend, Playwright
intercepts the request and returns the data that we define.

Think of it like this:

> 🎭 Mocking = Pretending the backend already replied with the data you
> want.

## Real-Life Example

Imagine you are testing an online shopping website.

### Without API Mocking

1.  The browser sends a request such as `GET /products`.
2.  The request goes to the real server.
3.  The server returns the product list.

### With API Mocking

1.  The browser sends a request such as `GET /products`.
2.  Playwright intercepts the request.
3.  Playwright returns a fake product list.
4.  The real server is never contacted for that intercepted request.

## Why Do We Use API Mocking?

Suppose the backend team hasn't finished developing the API.

-   **Without mocking:** Your UI may not be able to display data.
-   **With mocking:** You can continue testing the UI using fake data.

## Benefits of API Mocking

-   No dependency on backend developers.
-   Faster test execution.
-   No internet required for the mocked response itself.
-   Predictable test data.
-   Easier to test edge cases.
-   Can simulate server errors such as `404` and `500`.

## Example Application

Suppose the application loads products using:

``` http
GET https://example.com/api/products
```

A real API might return:

``` json
[
  {
    "id": 1,
    "name": "Laptop",
    "price": 50000
  },
  {
    "id": 2,
    "name": "Mobile",
    "price": 20000
  }
]
```

Instead of calling the real API, Playwright can return our own fake
data.

## Playwright Example

``` typescript
import { test, expect } from '@playwright/test';

test('Mock Products API', async ({ page }) => {
  // Intercept the API request
  await page.route('**/api/products', async route => {
    // Return a fake response
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        {
          id: 101,
          name: 'Playwright Book',
          price: 999
        },
        {
          id: 102,
          name: 'Automation Course',
          price: 1999
        }
      ])
    });
  });

  // Open the application
  await page.goto('https://example.com');
});
```

## How It Works

1.  **Application sends a request:** `GET /api/products`.
2.  **Playwright catches the request:**
    `page.route('**/api/products', ...)`.
3.  **The request is intercepted:** The matching request is handled by
    Playwright instead of reaching the real server.
4.  **Playwright sends fake JSON:** `route.fulfill()` returns the
    response defined in the test.
5.  **The application receives the response:** The UI can display the
    mocked product data as if it came from the backend.

## Workflow Diagram

``` text
User opens page
      |
      v
Browser sends request: GET /api/products
      |
      v
Playwright intercepts request: page.route(...)
      |
      v
Returns fake JSON using fulfill()
      |
      v
Browser receives fake response
      |
      v
UI displays mocked product data
```

## Understanding `page.route()`

``` typescript
await page.route('**/api/products', async route => {
  // Handle matching requests here
});
```

This tells Playwright to intercept requests that match `/api/products`.

The `**` wildcard can match different domains, for example:

-   `https://example.com/api/products`
-   `https://staging.example.com/api/products`
-   `https://test.example.com/api/products`

These URLs match the pattern `**/api/products`.

## Understanding `route.fulfill()`

`route.fulfill()` creates a custom HTTP response.

``` typescript
await route.fulfill({
  status: 200,
  contentType: 'application/json',
  body: JSON.stringify(data)
});
```

### `status`

``` typescript
status: 200
```

Represents a successful response.

### `contentType`

``` typescript
contentType: 'application/json'
```

Tells the browser that the response contains JSON.

### `body`

``` typescript
body: JSON.stringify(data)
```

Converts a JavaScript value into a JSON string for the response body.

## Before Mocking

``` text
Browser
   |
   v
Real API
   |
   v
Database
   |
   v
Response
```

Possible problems include:

-   The backend may be down.
-   The network may be slow.
-   Test data may be unstable.
-   The server may return errors.

## After Mocking

``` text
Browser
   |
   v
Playwright
   |
   v
Fake JSON
```

Benefits include faster execution, stability, reliability, and fully
controlled test data.

## When Should You Use API Mocking?

Use API mocking when:

-   The backend API is not ready.
-   The API is slow or unreliable.
-   You want consistent test data.
-   You need to simulate error responses such as `404` or `500`.
-   You want to test the UI independently of the backend.

Avoid mocking when:

-   You want to verify that the real backend and frontend work together
    in an end-to-end test.
-   You need to validate actual API responses from the server.

## Key Takeaways

-   API mocking means replacing a real API response with a fake one.
-   `page.route()` intercepts matching network requests.
-   `route.fulfill()` returns a custom response without contacting the
    real server for that intercepted request.
-   Mocking helps you test the UI even when the backend is unavailable
    or unstable.
-   It makes tests faster, more reliable, and easier to reproduce.

> 💡 **Beginner Tip:** Think of Playwright as a traffic police officer.
> When the browser tries to contact the server, Playwright stops the
> matching request, hands the browser a fake response, and the browser
> continues as if it came from the real backend.

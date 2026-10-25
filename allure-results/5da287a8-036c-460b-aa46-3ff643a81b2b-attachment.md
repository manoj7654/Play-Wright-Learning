# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Day30\get_booking_details.spec.ts >> Get booking details by ID
- Location: tests\Day30\get_booking_details.spec.ts:4:5

# Error details

```
SyntaxError: Unexpected token 'N', "Not Found" is not valid JSON
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | const BaseUrl = 'https://restful-booker.herokuapp.com';
  3  | 
  4  | test('Get booking details by ID', async ({ request }) => {
  5  | 
  6  |     const id=2308;
  7  | 
  8  |     const response =await request.get(`${BaseUrl}/booking/${id}`)
> 9  |     const responseBody = await response.json();
     |                          ^ SyntaxError: Unexpected token 'N', "Not Found" is not valid JSON
  10 | 
  11 |     console.log(responseBody)
  12 | 
  13 |     //Validate status code and status text
  14 |     expect(response.status()).toBe(200);
  15 |     expect(response.statusText()).toBe('OK');    
  16 | 
  17 |     //Validate fields in the response body
  18 |     expect(responseBody).toHaveProperty('firstname');
  19 |     expect(responseBody).toHaveProperty('lastname');
  20 |     expect(responseBody).toHaveProperty('totalprice');
  21 |     expect(responseBody).toHaveProperty('depositpaid');
  22 |     expect(responseBody).toHaveProperty('bookingdates');
  23 |     expect(responseBody).toHaveProperty('additionalneeds');
  24 | })
```
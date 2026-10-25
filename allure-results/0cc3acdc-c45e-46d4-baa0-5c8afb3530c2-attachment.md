# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Day30\create_booking_json.spec.ts >> Create a new booking with static data
- Location: tests\Day30\create_booking_json.spec.ts:9:5

# Error details

```
Error: expect(received).toMatchObject(expected)

- Expected  - 4
+ Received  + 4

  Object {
    "additionalneeds": "Breakfast",
-   "depositpaid": undefined,
-   "firstname": undefined,
-   "lastname": undefined,
-   "totalprice": undefined,
+   "depositpaid": true,
+   "firstname": "Manoj",
+   "lastname": "Kumar",
+   "totalprice": 500,
  }
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import fs from 'fs';
  3  | 
  4  | const BaseUrl = 'https://restful-booker.herokuapp.com';
  5  | const jsonfile = 'test-data/payload_data.json';
  6  | const payload=JSON.parse(fs.readFileSync(jsonfile,'utf-8'));
  7  | 
  8  | 
  9  | test('Create a new booking with static data', async ({ request }) => {
  10 | 
  11 |     const response= await request.post(`${BaseUrl}/booking`,{data:payload})
  12 |     const responseBody=await response.json();
  13 |     //console.log(responseBody);
  14 | 
  15 |     //Validate status code and status text
  16 |     expect(response.status()).toBe(200);
  17 |     expect(response.statusText()).toBe('OK');
  18 | 
  19 |     //Validate response body
  20 |     expect(responseBody).toHaveProperty('bookingid');
  21 |     expect(responseBody).toHaveProperty('booking');
  22 |     expect(responseBody.bookingid).toEqual(expect.any(Number));
  23 | 
  24 |     //Validate booking fields
  25 |     const booking= responseBody.booking;
> 26 |     expect(booking).toMatchObject(
     |                     ^ Error: expect(received).toMatchObject(expected)
  27 |         {
  28 |         "firstname": responseBody.firstname,
  29 |         "lastname": responseBody.lastname,
  30 |         "totalprice": responseBody.totalprice,
  31 |         "depositpaid": responseBody.depositpaid,
  32 |         "additionalneeds": "Breakfast",
  33 |     }
  34 |     )
  35 | 
  36 |     expect(booking.bookingdates).toMatchObject({
  37 |             "checkin": responseBody.checkin,
  38 |             "checkout": responseBody.checkout
  39 |         })
  40 | 
  41 | 
  42 | 
  43 | 
  44 | 
  45 | 
  46 | })
```
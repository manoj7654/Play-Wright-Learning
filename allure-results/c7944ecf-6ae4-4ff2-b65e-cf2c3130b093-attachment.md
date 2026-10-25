# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: day31\put_update_booking_details.spec.ts >> Update Booking, Create, Get and update booking details
- Location: tests\day31\put_update_booking_details.spec.ts:15:5

# Error details

```
SyntaxError: Unexpected end of JSON input
```

# Test source

```ts
  1  | //Create booking -->Booking ID
  2  | //Booking ID -->Get booking Id
  3  | //Booking ID -->Update booking 
  4  | //Booking ID -->Delete booking
  5  | 
  6  | import { test, expect } from '@playwright/test';
  7  | import fs from 'fs';
  8  | 
  9  | const BaseUrl = 'https://restful-booker.herokuapp.com';
  10 | 
  11 | function readJson(filePath: string) {
> 12 |     return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
     |                 ^ SyntaxError: Unexpected end of JSON input
  13 | }
  14 | 
  15 | test('Update Booking, Create, Get and update booking details', async ({ request }) => {
  16 | 
  17 |     //Step 1: Create a new booking
  18 |     const crateBooking_payload = await readJson('test-data/post_request_body.json')
  19 |     const createBooking = await request.post(`${BaseUrl}/booking`, { data: crateBooking_payload })
  20 |     const bookingResponse = await createBooking.json();
  21 |     const bookingId=bookingResponse.bookingid
  22 | 
  23 |     console.log('Booking details created successfully', bookingResponse)
  24 | 
  25 |     // Validate the response
  26 |     expect(createBooking.status()).toBe(200);
  27 |     expect(createBooking.statusText()).toBe('OK');
  28 | 
  29 | 
  30 |     //Step 2: Get the booking details by Id
  31 | 
  32 |     const getBooking = await request.get(`${BaseUrl}/booking/${bookingId}`)
  33 |     const getBooking_response = await getBooking.json();
  34 | 
  35 |     console.log('Fetch booking details successfully by Id', getBooking_response)
  36 | 
  37 |     // Validate the response
  38 |     expect(getBooking.status()).toBe(200);
  39 |     expect(getBooking.statusText()).toBe('OK');
  40 | 
  41 | 
  42 |     //Step 3: Create token for update, delete the booking details
  43 |     const createToken_payload=await readJson('test-data/create_token.json')
  44 |     const createToken=await request.post(`${BaseUrl}/auth`,{data:createToken_payload});
  45 |     const tokenResponse=await createToken.json();
  46 |     const token=tokenResponse.token
  47 | 
  48 |     console.log('Token Generated Successfully',token)
  49 |      // Validate the response
  50 |     expect(tokenResponse.status()).toBe(200);
  51 |     expect(tokenResponse.statusText()).toBe('OK');
  52 | 
  53 | 
  54 | 
  55 | })
```
# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: day31\put_update_booking_details.spec.ts >> Update Booking, Create, Get and update booking details
- Location: tests\day31\put_update_booking_details.spec.ts:15:5

# Error details

```
SyntaxError: Expected ',' or '}' after property value in JSON at position 195 (line 8 column 32)
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
     |                 ^ SyntaxError: Expected ',' or '}' after property value in JSON at position 195 (line 8 column 32)
  13 | }
  14 | 
  15 | test('Update Booking, Create, Get and update booking details', async ({ request }) => {
  16 | 
  17 |     //Step 1: Create a new booking
  18 |     const crateBooking_payload = await readJson('test-data/post_request_body.json')
  19 |     const createBooking = await request.post(`${BaseUrl}/booking`, { data: crateBooking_payload })
  20 |     const bookingResponse = await createBooking.json();
  21 |     const bookingId = bookingResponse.bookingid
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
  43 |     const createToken_payload = await readJson('test-data/create_token.json')
  44 |     const createToken = await request.post(`${BaseUrl}/auth`, { data: createToken_payload });
  45 |     const tokenResponse = await createToken.json();
  46 |     const token = tokenResponse.token
  47 | 
  48 |     console.log('Token Generated Successfully', token)
  49 |     // Validate the response
  50 |     expect(createToken.status()).toBe(200);
  51 |     expect(createToken.statusText()).toBe('OK');
  52 | 
  53 |     // Step 4: Partially update booking details
  54 |     const partialUpdate_payload = await readJson('test-data/patch_request_body.json')
  55 |     const partial_update = await request.patch(`${BaseUrl}/booking/${bookingId}`, {
  56 |         headers: {
  57 |             'Content-Type': 'application/json',
  58 |             'Accept': 'application/json',
  59 |             'Cookie': `token=${token}`
  60 |         },
  61 |         data: partialUpdate_payload
  62 |     })
  63 | 
  64 |     const partialUpdate_resopnse = await partial_update.json();
  65 | 
  66 |     console.log('Partially booking details update successfully', partialUpdate_resopnse)
  67 | 
  68 |     // Validate the response
  69 |     expect(partial_update.status()).toBe(200);
  70 |     expect(partial_update.statusText()).toBe('OK');
  71 | 
  72 |     // Step 5: Fully update booking details
  73 |     const update_payload = await readJson('test-data/put_request_body.json')
  74 |     const full_update = await request.put(`${BaseUrl}/booking/${bookingId}`, {
  75 |         headers: {
  76 |             'Content-Type': 'application/json',
  77 |             'Accept': 'application/json',
  78 |             'Cookie': `token=${token}`
  79 |         },
  80 |         data: update_payload
  81 |     })
  82 | 
  83 |     const update_response = await full_update.json();
  84 | 
  85 |     console.log('Partially booking details update successfully', update_response)
  86 | 
  87 |     // Validate the response
  88 |     expect(full_update.status()).toBe(200);
  89 |     expect(full_update.statusText()).toBe('OK');
  90 | 
  91 | 
  92 | })
```
# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Day32\file_upload_and_download.spec.ts >> File upload and download using API >> Download File
- Location: tests\Day32\file_upload_and_download.spec.ts:32:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 201
Received: 404
```

# Test source

```ts
  1  | 
  2  | /*
  3  | File upload and download using api chaining
  4  | API Refrence
  5  | 
  6  | https://fakeapi.platzi.com/en/rest/files/
  7  | 
  8  | */
  9  | 
  10 | import { test, expect } from '@playwright/test';
  11 | import * as fs from 'fs'
  12 | test.describe.parallel('File upload and download using API', () => {
  13 |    let fileName="";
  14 |     test('File upload', async ({ request }) => {
  15 |         const filePath = './uploads/dummy.txt'
  16 |         const response = await request.post('https://api.escuelajs.co/api/v1/files/upload', {
  17 |             multipart: {
  18 |                 file: {
  19 |                     name: 'dummy.txt',
  20 |                     mimeType: 'text/plain',
  21 |                     buffer: await fs.readFileSync(filePath)
  22 |                 }
  23 |             }
  24 |         })
  25 |         expect(response.status()).toBe(201)
  26 |         const responseBody = await response.json()
  27 |         console.log(responseBody)
  28 |         fileName = responseBody.filename;
  29 |         expect(responseBody.originalname).toBe('dummy.txt');
  30 |     })
  31 | 
  32 |     test('Download File', async ({ request }) => {
  33 |         const response = await request.get(`https://api.escuelajs.co/api/v1/files/${fileName}`)
> 34 |         expect(response.status()).toBe(201)
     |                                   ^ Error: expect(received).toBe(expected) // Object.is equality
  35 |         const responseBody = await response.json()
  36 |         console.log(responseBody)
  37 | 
  38 |     })
  39 | })
```
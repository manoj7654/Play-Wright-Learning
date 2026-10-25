
/*
File upload and download using api chaining
API Refrence

https://fakeapi.platzi.com/en/rest/files/

*/

import { test, expect } from '@playwright/test';
import * as fs from 'fs'
test.describe.serial('File upload and download using API', () => {
    let fileName = "";
    test('File upload', async ({ request }) => {
        const filePath = './uploads/sample.txt'
        const response = await request.post('https://api.escuelajs.co/api/v1/files/upload', {
            multipart: {
                file: {
                    name: 'sample.txt',
                    mimeType: 'text/plain',
                    buffer: await fs.readFileSync(filePath)
                }
            }
        })
        expect(response.status()).toBe(201)
        const responseBody = await response.json()
        console.log(responseBody)
        fileName = responseBody.filename;
        expect(responseBody.originalname).toBe('sample.txt');
    })

    test('Download File', async ({ request }) => {
        const response = await request.get(`https://api.escuelajs.co/api/v1/files/${fileName}`)
        expect(response.status()).toBe(200)
        const responseBody = await response.text()
        expect(responseBody).toContain('Welcome to the playwright')

    })
})


//For PDF

test.describe.serial('File upload and download using API with PDF', () => {
    let fileName = "";
    test('PDF File upload', async ({ request }) => {
        const filePath = './uploads/pdf-sample.pdf'
        const response = await request.post('https://api.escuelajs.co/api/v1/files/upload', {
            multipart: {
                file: {
                    name: 'pdf-sample.pdf',
                    mimeType: 'application/pdf',
                    buffer: await fs.readFileSync(filePath)
                }
            }
        })
        expect(response.status()).toBe(201)
        const responseBody = await response.json()
        console.log(responseBody)
        fileName = responseBody.filename;
        expect(responseBody.originalname).toBe('pdf-sample.pdf');
    })

    test('PDF File Download', async ({ request }) => {
        const response = await request.get(`https://api.escuelajs.co/api/v1/files/${fileName}`)
        expect(response.status()).toBe(200)
        // Read the downloaded file as a buffer
        const responseBody = await response.body();
        // Verify that the response is not empty
        expect(responseBody.length).toBeGreaterThan(0);
        // Check the PDF file signature (%PDF)
        expect(responseBody.subarray(0, 5).toString()).toBe('%PDF-');

    })
})
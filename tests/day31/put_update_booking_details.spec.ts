//Create booking -->Booking ID
//Booking ID -->Get booking Id
//Booking ID -->Update booking 
//Booking ID -->Delete booking

import { test, expect } from '@playwright/test';
import fs from 'fs';

const BaseUrl = 'https://restful-booker.herokuapp.com';

function readJson(filePath: string) {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

test('Update Booking, Create, Get and update booking details', async ({ request }) => {

    //Step 1: Create a new booking
    const crateBooking_payload = await readJson('test-data/post_request_body.json')
    const createBooking = await request.post(`${BaseUrl}/booking`, { data: crateBooking_payload })
    const bookingResponse = await createBooking.json();
    const bookingId = bookingResponse.bookingid

    console.log('Booking details created successfully', bookingResponse)

    // Validate the response
    expect(createBooking.status()).toBe(200);
    expect(createBooking.statusText()).toBe('OK');


    //Step 2: Get the booking details by Id

    const getBooking = await request.get(`${BaseUrl}/booking/${bookingId}`)
    const getBooking_response = await getBooking.json();

    console.log('Fetch booking details successfully by Id', getBooking_response)

    // Validate the response
    expect(getBooking.status()).toBe(200);
    expect(getBooking.statusText()).toBe('OK');


    //Step 3: Create token for update, delete the booking details
    const createToken_payload = await readJson('test-data/create_token.json')
    const createToken = await request.post(`${BaseUrl}/auth`, { data: createToken_payload });
    const tokenResponse = await createToken.json();
    const token = tokenResponse.token

    console.log('Token Generated Successfully', token)
    // Validate the response
    expect(createToken.status()).toBe(200);
    expect(createToken.statusText()).toBe('OK');

    // Step 4: Partially update booking details
    const partialUpdate_payload = await readJson('test-data/patch_request_body.json')
    const partial_update = await request.patch(`${BaseUrl}/booking/${bookingId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Cookie': `token=${token}`
        },
        data: partialUpdate_payload
    })

    const partialUpdate_resopnse = await partial_update.json();

    console.log('Partially booking details update successfully', partialUpdate_resopnse)

    // Validate the response
    expect(partial_update.status()).toBe(200);
    expect(partial_update.statusText()).toBe('OK');

    // Step 5: Fully update booking details
    const update_payload = await readJson('test-data/put_request_body.json')
    const full_update = await request.put(`${BaseUrl}/booking/${bookingId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Cookie': `token=${token}`
        },
        data: update_payload
    })

    const update_response = await full_update.json();

    console.log('Booking details update successfully', update_response)

    // Validate the response
    expect(full_update.status()).toBe(200);
    expect(full_update.statusText()).toBe('OK');


    //Step 6: Delet the booking details
    const deleteBookingDetails = await request.delete(`${BaseUrl}/booking/${bookingId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Cookie': `token=${token}`
        }
        })


    console.log('Deleted booking details successfully')

    // Validate the response
    expect(deleteBookingDetails.status()).toBe(201);
    expect(deleteBookingDetails.statusText()).toBe('Created');
})
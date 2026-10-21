import { test, expect } from '@playwright/test';
import fs from 'fs';

const BaseUrl = 'https://restful-booker.herokuapp.com';
const jsonfile = 'test-data/payload_data.json';
const payload = JSON.parse(fs.readFileSync(jsonfile, 'utf-8'));


test('Create a new booking with static data', async ({ request }) => {

    const response = await request.post(`${BaseUrl}/booking`, { data: payload })
    const responseBody = await response.json();
    console.log(responseBody);

    //Validate status code and status text
    expect(response.status()).toBe(200);
    expect(response.statusText()).toBe('OK');

    //Validate response body
    expect(responseBody).toHaveProperty('bookingid');
    expect(responseBody).toHaveProperty('booking');
    expect(responseBody.bookingid).toEqual(expect.any(Number));

    //Validate booking fields
    const booking = responseBody.booking;
    expect(booking).toMatchObject(
        {
            "firstname": payload.firstname,
            "lastname": payload.lastname,
            "totalprice": payload.totalprice,
            "depositpaid": payload.depositpaid,
            "additionalneeds": payload.additionalneeds,
        }
    )

    expect(booking.bookingdates).toMatchObject({
        "checkin": payload.bookingdates.checkin,
        "checkout": payload.bookingdates.checkout
    })
})
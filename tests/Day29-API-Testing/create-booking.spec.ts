import { test, expect } from '@playwright/test';

const BaseUrl = 'https://restful-booker.herokuapp.com';

test('Create a new booking with static data', async ({ request }) => {

    const payload = {
        "firstname": "Manoj",
        "lastname": "Kumar",
        "totalprice": 500,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2026-10-19",
            "checkout": "2026-10-20"
        },
        "additionalneeds": "Breakfast",

    }

    const response= await request.post(`${BaseUrl}/booking`,{data:payload})
    const responseBody=await response.json();
    //console.log(responseBody);

    //Validate status code and status text
    expect(response.status()).toBe(200);
    expect(response.statusText()).toBe('OK');

    //Validate response body
    expect(responseBody).toHaveProperty('bookingid');
    expect(responseBody).toHaveProperty('booking');
    expect(responseBody.bookingid).toEqual(expect.any(Number));

    //Validate booking fields
    const booking= responseBody.booking;
    expect(booking).toMatchObject(payload)

    expect(booking.bookingdates).toMatchObject({
            "checkin": "2026-10-19",
            "checkout": "2026-10-20"
        })






})
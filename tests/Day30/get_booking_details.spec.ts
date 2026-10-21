import { test, expect } from '@playwright/test';
const BaseUrl = 'https://restful-booker.herokuapp.com';

test('Get booking details by ID', async ({ request }) => {

    const id=2308;

    const response =await request.get(`${BaseUrl}/booking/${id}`)
    const responseBody= await response.json()
    console.log(responseBody)

    //Validate status code and status text
    expect(response.status()).toBe(200);
    expect(response.statusText()).toBe('OK');    

    //Validate fields in the response body
    expect(responseBody).toHaveProperty('firstname');
    expect(responseBody).toHaveProperty('lastname');
    expect(responseBody).toHaveProperty('totalprice');
    expect(responseBody).toHaveProperty('depositpaid');
    expect(responseBody).toHaveProperty('bookingdates');
    expect(responseBody).toHaveProperty('additionalneeds');
})


test('Get booking details by parameter', async ({ request }) => {

    const firstname='Jim'
    const lastname="Smith"

    const response =await request.get(`${BaseUrl}/booking`,{params:{firstname,lastname}})
    const responseBody= await response.json()
    console.log(responseBody)

    //Validate status code and status text
    expect(response.status()).toBe(200);
    expect(response.statusText()).toBe('OK');    

    //Verify that booking id should be number and greater than 0
    for (const booking of responseBody) {
        expect(typeof booking.bookingid).toBe('number');
        expect(booking.bookingid).toBeGreaterThan(0);
    }
})
import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import{DateTime} from 'luxon';
const BaseUrl = 'https://restful-booker.herokuapp.com';

test('Create a new booking with static data', async ({ request }) => {
    const firstname = faker.person.firstName();
    const lastname = faker.person.lastName();
    const totalprice = faker.number.int({ min: 100, max: 1000 });
    const depositpaid = faker.datatype.boolean();
    const checkin= DateTime.now().toFormat('yyyy-MM-dd');
    const checkout= DateTime.now().plus({ days: 5 }).toFormat('yyyy-MM-dd');
    const additionalneeds = 'Breakfast';

    const payload={
        firstname: firstname,
        lastname: lastname,
        totalprice: totalprice,
        depositpaid: depositpaid,
        bookingdates: {
            checkin: checkin,   
        checkout: checkout
        },
        additionalneeds: additionalneeds
    }

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
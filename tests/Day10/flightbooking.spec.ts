import { expect, test } from '@playwright/test';

test('Flight Booking Validation', async ({ page }) => {

    await page.goto('https://blazedemo.com/');
    await expect(page.getByText('Welcome to the Simple Travel Agency!')).toBeVisible();

    //Select Boston as departure city
    const departurCity = page.locator('select[name="fromPort"]');
    await departurCity.selectOption({ label: 'Boston' });


    //Select New York as destination city
    const destinationCity = page.locator('select[name="toPort"]')
    await destinationCity.selectOption({ label: 'New York' })

    const findFlights = page.locator("input[value='Find Flights']")
    await findFlights.click()

    //Verify that flights result table is displayed
    await expect(page).toHaveURL('https://blazedemo.com/reserve.php')
    await expect(page.getByText('Flights from Boston to New York: ')).toBeVisible()


    //Count number of flight rows
    const tableRowLocator = await page.locator('table tbody tr').all();
    console.log(tableRowLocator.length)

    //Verify at least one flight is available
    expect(tableRowLocator.length).toBeGreaterThan(0)

    //Capture all flight prices from the table
    const price: string[] = [];
    for (let i = 0; i < tableRowLocator.length; i++) {
        const flightPrice = await tableRowLocator[i].locator('td').last().innerText()
        price.push(flightPrice.replace('$', " "))
    }

    console.log(price)
    //Identify the lowest price among all flights
    let lowest = Infinity;
    for (let i = 0; i < price.length; i++) {
        const currentPrice = Number(price[i])

        if (currentPrice < lowest) {
            lowest = currentPrice
        }
    }
    //Click on Choose This Flight for the lowest price row
    const tableLocator = await page.locator('table tbody tr')
    const rowCount = await tableLocator.count()
    for (let i = 0; i < rowCount; i++) {
        const currentPrice = Number(price[i]);
        const chooseFlight = tableLocator
            .nth(i)
            .locator('td')
            .first()
        if (currentPrice === lowest) {
            await chooseFlight.click();
            break;
        }

    }

    /*Enter passenger details:
    • Name: John
    • Address: 1403 American Beauty Ln
    • City: Columbus
    • State: OH
    • Zip Code: 43240
    • Card Type: American Express
    • Card Number: 6789067345231267
    • Expiry Month: 10
    • Expiry Year: 2024
    • Name on Card: John Canedy
    */

    const Name = page.locator('#inputName');
    const Address = page.locator('#address');
    const City = page.locator('#city');
    const State = page.locator("input[placeholder='State']");
    const Zip = page.locator('#zipCode');
    const Card = page.locator('#cardType');
    const CardNumber = page.locator("input[placeholder='Credit Card Number']");
    const expiryMonth = page.locator("input[placeholder='Month']");
    const expiryYear = page.locator("input[placeholder='Year']");
    const cardHolderName = page.locator('#nameOnCard')

    const purchaseFlight = page.locator("input[value='Purchase Flight']");

    await Name.fill('John');
    await Address.fill('1403 American Beauty Ln');
    await City.fill('Columbus');
    await State.fill('OH');
    await Zip.fill('43240')
    await Card.selectOption({ label: 'American Express' })
    await CardNumber.fill('6789067345231267')
    await expiryMonth.fill('10');
    await expiryYear.fill('2024');
    await cardHolderName.fill('John Canedy')

    await purchaseFlight.click();
    expect(page.getByText('Thank you for your purchase today!')).toBeVisible()


    await page.waitForTimeout(8000); // Wait for the page to load


});
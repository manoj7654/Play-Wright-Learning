import { test, expect } from "@playwright/test";

test('Static Table', async ({ page }) => {
    await page.goto('https://sdetqa.vercel.app/autoplay');

    // Functional Validations
    const table = page.locator('table').first();
    const header = table.locator('thead th');

    const row = table.locator('tbody tr');
    await expect(header).toHaveCount(5);
    await expect(row).toHaveCount(4);
    //await expect(column).toHaveCount(5);

    //Read all data from 2nd row (index 2 → 3rd row including header) → Expected: Keyboard | Electronics | $79 | 0 | Out of Stock
    const row2data = row.nth(2).locator('td');
    await expect(row2data).toHaveText(['Keyboard', 'Electronics', '$79', '0', 'Out of Stock']);

    //Read all data from the table (excluding header) → Expected: 4 rows of product data
    const rowcount = await row.count();
    const tabledata: string[][] = [];

    for (let i = 0; i < rowcount; i++) {
        const rowdata = await row.nth(i).locator('td').allInnerTexts();
        tabledata.push(rowdata);
    }
   // console.log(tabledata);

    //Print all product names → Expected: Laptop, Mouse, Keyboard, Monitor
    const productnames: string[] = [];
    for (let i = 0; i < tabledata.length; i++) {
        productnames.push(tabledata[i][0]);
    }
    expect(productnames).toEqual(['Laptop', 'Mouse', 'Keyboard', 'Monitor']);


    //Print products where Stock = 0 → Expected: Keyboard
    const outofstock: string[] = [];
    for (let i = 0; i < tabledata.length; i++) {
        if (tabledata[i][3] === '0') {
            {
                outofstock.push(tabledata[i][0]);
            }
        }
    }
    expect(outofstock).toEqual(['Keyboard']);

    //Print products where Status = "In Stock" → Expected: Laptop, Mouse, Monitor
    const insstock = [];
    for (let i = 0; i < tabledata.length; i++) {
        if (tabledata[i][4] === 'In Stock') {
            {
                insstock.push(tabledata[i][0]);
            }
        }
    }
    expect(insstock).toEqual(['Laptop', 'Mouse', 'Monitor']);

    //Count number of products "In Stock" → Expected: 3
    expect(insstock.length).toEqual(3);

    //Count number of products "Out of Stock" → Expected: 1
    expect(outofstock.length).toEqual(1);

    //Get price of a specific product (e.g., Mouse) → Expected: $29
    let price;
    for (let i = 0; i < tabledata.length; i++) {
        if (tabledata[i][0] === 'Mouse') {
            price = tabledata[i][2];
        }
    }
    expect(price).toEqual('$29');

//Calculate total price of all products → Expected: 999 + 29 + 79 + 349 = 1456
 let total=0;
 for(let i=0;i<tabledata.length;i++){
    total+=Number(tabledata[i][2].replace('$', ''));
 }
 expect(total).toEqual(1456);

 //Find product with highest price → Expected: Laptop ($999)
 let highest=-Infinity;
 let str='';
 for(let i=0;i<tabledata.length;i++){
    let price=Number(tabledata[i][2].replace('$', ''));
    if(price>highest){
        highest=price;
        str=`${tabledata[i][0]} ($${highest})`;
    }
 }
   expect(str).toEqual('Laptop ($999)');

   //Find product with lowest price → Expected: Mouse ($29)
    let lowest=Infinity;
 let res='';
 for(let i=0;i<tabledata.length;i++){
    let price=Number(tabledata[i][2].replace('$', ''));
    if(price<lowest){
        lowest=price;
        res=`${tabledata[i][0]} ($${lowest})`;
    }
 }
   expect(res).toEqual('Mouse ($29)');
   //console.log(res)
    await page.waitForTimeout(3000)

})
     

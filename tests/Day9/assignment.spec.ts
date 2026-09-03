import { test, expect } from "@playwright/test";

test('Crud operation in table', async ({ page }) => {
    await page.goto('https://sdetqa.vercel.app/autoplay');

   //1. Open the CRUD Web Table page. 
   // The page opens successfully and the Web Table with  CRUD section is displayed.
   await expect(page.getByText('Web Table with CRUD ')).toBeVisible()

   //2. Verify the CRUD table is displayed. 
   // The table is visible with the headers #, Name, Role, Action.
   const table = page.locator('table').nth(1)
   const headers=table.locator('th').first();
   const name=table.locator('th').nth(1);
   const role=table.locator('th').nth(2);
   const action=table.locator('th').nth(3);

   expect(await headers.textContent()).toBe('#')
   expect(await name.textContent()).toBe('Name')
   expect(await role.textContent()).toBe('Role')
   expect(await action.textContent()).toBe('Action')

   //3. Verify the input fields and buttons. 
   // Name, Role, Add, + Dynamic, and Search fields are visible and enabled.
   const Name=page.locator('input[placeholder="Name"]');
   const Role=page.locator('input[placeholder="Role"]');
   const button=page.getByRole('button',{name:'Add'})
   const dynamic=page.getByRole('button',{name:'Dynamic'})
   const search=page.locator('input[placeholder="Search table..."]')

   await expect(Name).toBeVisible()
   await expect(Role).toBeVisible()
   await expect(button).toBeVisible()
   await expect(dynamic).toBeVisible()
   await expect(search).toBeVisible()

   await expect(Name).toBeEnabled()
   await expect(Role).toBeEnabled()
   await expect(button).toBeEnabled()
   await expect(dynamic).toBeEnabled()
   await expect(search).toBeEnabled()

   //4. Verify the default table data. 
   // The table contains two records: Alice and Bob. 
  const tabledata:string[][]=[]
  const rowcount=await table.locator('tbody tr').count()    

   for (let i=0;i<rowcount;i++){
    tabledata.push(await table.locator('tbody tr').nth(i).locator('td').allInnerTexts())
   }
  let record=[];
  for(let i=0;i<tabledata.length;i++){
    record.push(tabledata[i][1]);

  }  
  expect(record).toEqual(['Alice','Bob'])

  //5. Enter Sam Tester as Name and QA Lead as Role. Click Add. 
  //A new row for Sam Tester with role QA Lead is added to the table. 
  await Name.fill('Manoj');
  await Role.fill('QA Lead');
  await button.click();


const newRow = page.locator('tr').filter({ hasText: 'Manoj' });

await expect(newRow).toBeVisible();

//6. Verify the total number of rows. 
// The table now contains 3 rows.

const newRowCount = await table.locator('tbody tr').count();
expect(newRowCount).toBe(3);

//7. Search for Alice in the search box. 
// Only the Alice record is visible, and other rows are hidden. 
await search.fill('Alice');
const aliceRow=page.locator('tr').filter({hasText:'Alice'})
await expect(aliceRow).toBeVisible();

//8. Clear the search box. 
// All table rows become visible again. 
await search.fill('');

//9. Delete the Bob record by clicking Delete and accept the confirmation dialog. 
//The Bob record is removed from the table and the total row count decreases to 2.

const bobRow = table.locator('tbody tr').filter({ hasText: 'Bob' });

await expect(bobRow).toBeVisible();

// Accept the confirmation dialog
page.on('dialog', async dialog => {
    await dialog.accept();
});

// Click Delete inside Bob's row
await bobRow.getByRole('button', { name: 'Delete' }).click();

// Verify Bob is removed
await expect(
    table.locator('tbody tr').filter({ hasText: 'Bob' })
).toHaveCount(0);

// Verify total row count is now 2
const finalRowCount = await table.locator('tbody tr').count();

expect(finalRowCount).toBe(2);
console.log('Final row count:', finalRowCount);

//10. Click the + Dynamic button. 
// A new dynamic record is added to the table with values such as New and Dev, confirming the button works successfully. 
dynamic.click();
const dynamicRow = page.locator('tr').filter({ hasText: 'New' });

await expect(dynamicRow).toBeVisible();
await expect(dynamicRow).toContainText('New');
await expect(dynamicRow).toContainText('Dev');

const dynamicRowCount = await table.locator('tbody tr').count();

console.log('Row count after Dynamic:', dynamicRowCount);

expect(dynamicRowCount).toBe(3);



await page.waitForTimeout(7000)

})
     

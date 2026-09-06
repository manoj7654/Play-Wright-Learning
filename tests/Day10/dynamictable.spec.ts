import { test, expect } from "@playwright/test";

test.describe('Dynamic Table', () => {

    test.beforeEach(async({page})=>{
        await page.goto('https://sdetqa.vercel.app/autoplay')
        await expect(page.getByText('AutoPlay')).toBeVisible();
    })

    test('Chrome CPU Load Validation', async({page})=>{
        const tablerow=await page.locator('#taskTable tbody tr').all();
        expect(tablerow.length).toBeGreaterThan(0);

        let cpuLoad="";
        let expectedCpuLoad;

        for(let i=0;i<tablerow.length;i++){
            const process= await tablerow[i].locator('td').nth(0).innerText();
            
            if(process==='Chrome'){
                cpuLoad=await tablerow[i].locator('td', { hasText: '%' }).innerText();
                expectedCpuLoad=await page.locator('strong.chrome-cpu').innerText();

                expect(cpuLoad).toEqual(expectedCpuLoad);
                break;
            }
        }
        //Extract CPU load value (should contain %).
        expect(cpuLoad).toContain('%');

        //Verify CPU load value is not empty.
        expect(cpuLoad).not.toBe('');

        //Verify yellow label (strong.chrome-cpu) is visible.
        const label=page.locator('strong.chrome-cpu');
        await expect(label).toBeVisible();

        //Verify yellow label value matches the extracted CPU load
        await expect(label).toContainText(cpuLoad);

    })


    test('Firefox Memory Usage Validation', async({page})=>{
        const tablerow=await page.locator('#taskTable tbody tr').all();
        expect(tablerow.length).toBeGreaterThan(0);

        let memoryValue="";
        let expectMemoryValue;;

        for(let i=0;i<tablerow.length;i++){
            const process= await tablerow[i].locator('td').nth(0).innerText();
            
            if(process==='Firefox'){
                //Extract memory value ending with MB
                memoryValue=await tablerow[i].locator('td', { hasText: /MB$/ }).innerText();
                expectMemoryValue=await page.locator('strong.firefox-memory').innerText();
                //Verify extracted value matches pattern (e.g., \d+ MB).
                expect(memoryValue).toEqual(expectMemoryValue);
                break;
            }
        }
        //Extract memory value (should contain MB).
        expect(memoryValue).toContain('MB');

        //Verify memory value is not empty.
        expect(memoryValue).not.toBe('');

        // Verify blue label (strong.firefox-memory) is visible.
        const label=page.locator('strong.firefox-memory');
        await expect(label).toBeVisible();

        //Compare extracted memory with label value.
        await expect(label).toContainText(memoryValue);

    })


     test('Chrome Network Speed Validation', async({page})=>{
        const tablerow=await page.locator('#taskTable tbody tr').all();
        expect(tablerow.length).toBeGreaterThan(0);

        let networkSpeed="";
        let expectNetworkSpeed="";

        for(let i=0;i<tablerow.length;i++){
            const process= await tablerow[i].locator('td').nth(0).innerText();
            
            if( process==='Chrome'){
                //Extract network speed value ending with MB/s
                networkSpeed=await tablerow[i].locator('td', { hasText: /Mbps$/ }).innerText();
                expectNetworkSpeed=await page.locator('strong.chrome-network').innerText();
                //Verify extracted value matches pattern (e.g., \d+ (KB/s|MB/s)).
                expect(networkSpeed).toEqual(expectNetworkSpeed);
                break;
            }
        }
        //Extract network speed value (should contain MB/s).
        expect(networkSpeed).toContain('Mbps');

        //Verify network speed value is not empty.
        expect(networkSpeed).not.toBe('');

        // Verify orange label (strong.chrome-network) is visible.
        const label=page.locator('strong.chrome-network');
        await expect(label).toBeVisible();

        //Compare extracted network speed with label value.
        await expect(label).toContainText(networkSpeed);

    })


    test('Firefox Disk Space Validation', async({page})=>{
        const tablerow=await page.locator('#taskTable tbody tr').all();
        expect(tablerow.length).toBeGreaterThan(0);

        let firefoxDiskSpace="";
        let expectFirefoxDiskSpace="";

        for(let i=0;i<tablerow.length;i++){
            const process= await tablerow[i].locator('td').nth(0).innerText();
            
            if( process==='Firefox'){
                //Extract disk space value ending with MB/s
                firefoxDiskSpace=await tablerow[i].locator('td', { hasText: /MB\/s$/ }).innerText();
                expectFirefoxDiskSpace=await page.locator('strong.firefox-disk').innerText();
                //Verify extracted value matches pattern (e.g., \d+ (KB/s|MB/s)).
                expect(firefoxDiskSpace).toEqual(expectFirefoxDiskSpace);
                break;
            }
        }
        //Extract disk space value (should contain MB/s).
        expect(firefoxDiskSpace).toContain('MB/s');

        //Verify disk space value is not empty.
        expect(firefoxDiskSpace).not.toBe('');

        // Verify violet label (strong.firefox-disk) is visible.
        const label=page.locator('strong.firefox-disk');
        await expect(label).toBeVisible();

        //Compare extracted disk space with label value.
        await expect(label).toContainText(firefoxDiskSpace);

    })

})
     

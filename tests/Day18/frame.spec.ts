import {test,expect} from "@playwright/test";

test('Handle frame',async({page})=>{
   await page.goto('https://ui.vision/demo/webtest/frames/')

   //count the no of frames
   const frame_count=page.frames();
   console.log(frame_count.length)
   expect(frame_count.length).toBe(7)

   //Approach 1: Using page.frame() -  This approach is not recommended.
    //page.frame() returns a Frame object. It doesn't wait, can return null.
    //After getting the frame object, we can locate and interact with elements inside that frame.

   const frame1=page.frame({url:'https://ui.vision/demo/webtest/frames/frame_1'})

   if(frame1){
    await frame1.locator("input[name='mytext1']").fill('Manoj')
    await page.waitForTimeout(5000)
   }else{
    console.log('Frame is not found')
   }

 // Approach 2: Using frameLocator()
    // frameLocator() is the recommended approach because it directly
    // locates elements inside an iframe without creating a Frame object.

    const text=page.frameLocator("frame[src='frame_1.html']").locator("input[name='mytext1']")
    await text.fill('Mala')
    await page.waitForTimeout(5000)

})
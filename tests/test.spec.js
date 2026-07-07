import { request } from 'http';
import {test, expect} from '@playwright/test';
import { context } from '@cucumber/cucumber';

// const browser = await chromium.launch();
// const context = browser.newContext();
// const page = context.newPage();


//Write playwright to login and verify
// test("Login Test", async({page})=>{
//     await page.goto('webURL');//Navigation
//     await page.fill('locator',"userName");//locator
//     await page.fill('locator','password');
//     await page.click('LoginButton');

//     await expect(page).toHaveURL('/bashboard');//assertion
// });

// //Verify dropdown selection
// test('Select Dropdown value',async({page})=>{
//     await page.goto('/');
//     await page.selectOption("#country",'India');

//     await expect(page.locator('#country').toHaveValue('India'));
// });

// // Handle file upload
// test('File Upload',async ({page})=>{
//     await page.goto('/');
//     await page.setInputFile('#fileUplad','doc.pdf');
//     await page.click('#submit');
// });

// //Handle a multipul tabs
// test('Handle new tab',async({page})=>{
//     const [newPage] = await Promise.all(
//         [
//             page.context.waitForEvent('page'),
//             page.click('#openTab')
//         ]
//     );
//     await newPage.waitForLoadState();
//     await newPage.bringToFront(); // to switchs the tabs

//     //switch between the tabs
//     const pages = context.pages()// for existing tabs
//     const tab1 = pages[0];
//     const tab2 = pages[1];

//     await tab2.waitForLoadState();
//     await tab1.bringToFront();
// });

// // Verify table contains specific value
// test('Verify Table Data',async({page})=>{
//     await page.goto('/');
//     const tableRow = await page.locator('table tr');
//     await expect(tableRow).toContainsText('Sujith');
// });

// // API CAll
// test('Validat GET API call',async (request)=>{
//     const response = await request.get("");
//     expect(response.status()).toBe(200);

//     expect(response.ok()).toBeTruthy();
//     const body = await response.json();
//     expect(body.data.id).toBe(2);
//     expect(body.data.first_name).toBe('Janet');

//     expect(body.userName).toBe('Admin');
//     expect(body.role).toBe('Manager');
//     expect(body.active).toBe(true);

// })

// await page.waitForResponse(response =>
//     response.url().includes('/users') &&
//     response.status() === 200
// );

// // Intercept an API request and mock the response.
// test('Mock API',async(page)=>{
//     await page.route('**/apiEndPoint', route =>{
//         route.fullFill({
//             status:200,
//             body: JSON.stringify({name:'Test User'})
//         })
//     })
// })

// // Verify element appears after an API call
// test('Wait for API response',async(page)=>{
//     await page.waitForResponse('**/Api/endpoint');
//     await expect(page.locator('.productList').toBeVisible());
// })

// //Right Click
// await page.locator('#file').click({
//     button: 'right'
// });

// // Double Click
// await page.locator('#file').dblClick();

// //Drag and Drop
// await page.locator('#source').dragTo(
//     page.locator('#target')
// );

// //popups and Dialogs
// page.on('dialog', async dialog => {
//     console.log(dialog.message());
//     await dialog.accept();
// });

// await page.locator('#login').waitFor({
//     state: 'visible'
// });

// await page.locator('#loader').waitFor({
//     state: 'hidden'
// });

// await page.locator('.spinner').waitFor({
//     state: 'detached'
// });

// await page.waitForLoadState('networkidle');
// await page.waitForLoadState('load');
// await page.waitForLoadState('domcontentloaded');


// //Explicit Navigation Wait
// await Promise.all([
//     page.waitForNavigation(),
//     page.click('#login')
// ]);

// //Run only failed tests from the last execution
// //  -- > npx playwright test --last-failed




test("navigation to application",async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');
    expect(page.getByText('Automation Testing Practice')).toBeVisible();
});

test('Dynamic button', async ({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');
    await page.locator('button[name="start"]').waitFor({state:'visible'});
    await page.getByRole('button',{name:'Start'}).click();
    expect(page.locator('button[name="stop"]')).toBeVisible
    // await page.locator('button[name="stop"]').waitFor({state:'visible'});
})

test('Validate Alerts & Popups', async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');
    await page.getByText('Simple Alert').click();
    page.on('dialog', async (dialog) =>{
        dialog.accept();
    })
    await page.getByRole('button',{name:'Confirmation Alert'}).click()
    page.on('dialog', async (dialog) =>{
        dialog.dismiss();
    })
})

test('Validate new Tab',async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');
    const newTabPromise = page.context().waitForEvent('page');
    await page.getByRole('button',{name:'New Tab'}).click();
    const newTab = await newTabPromise;
    await newTab.waitForLoadState();
    await newTab.close();
    await page.bringToFront();
})

test('Handling the popup window',async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');
    const [popup] = await Promise.all(
        [
            page.waitForEvent("popup"),
            page.click('text=Popup Windows')
        ]
    )
    await popup.waitForLoadState();
    popup.close();
});

test('Validate mouse hover',async function ({page}){
    await page.goto('https://testautomationpractice.blogspot.com/');
    await page.getByRole('button',{name:"Point Me"}).hover();
    const el = await page.locator(".dropdown-content");
    const dropdowns = await el.all();

    const texts = await el.evaluateAll(elements =>
        elements.map(el => el.textContent)
    );
    for(const el of dropdowns){
        await el.isVisible();
        await el.click();
    }
    console.log(texts);
})

test('Drag and Drop', async function({page}){
    await page.goto('https://testautomationpractice.blogspot.com/');
    const source = page.locator('#draggable');
    const traget = page.locator('#droppable');
    await source.dragTo(traget);

})
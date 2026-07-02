import {test, expect} from 'palywright/test';

// const browser = await chromium.launch();
// const context = browser.newContext();
// const page = context.newPage();


//Write playwright to login and verify
test("Login Test", async({page})=>{
    await page.goto('webURL');//Navigation
    await page.fill('locator',"userName");//locator
    await page.fill('locator','password');
    await page.click('LoginButton');

    await expect(page).toHaveURL('/bashboard');//assertion
});

//Verify dropdown selection
test('Select Dropdown value',async({page})=>{
    await page.goto('/');
    await page.selectOption("#country",'India');

    await expect(page.locator('#country').toHaveValue('India'));
});

// Handle file upload
test('File Upload',async ({page})=>{
    await page.goto('/');
    await page.setInputFile('#fileUplad','doc.pdf');
    await page.click('#submit');
});

//Handle a multipul tabs
test('Handle new tab',async({page,context})=>{
    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'),
            page.click('#openTab')
        ]
    );
    await newPage.waitForLoadState();
    await newPage.bringToFront(); // to switchs the tabs

    //switch between the tabs
    const pages = context.pages()// for existing tabs
    const tab1 = pages[0];
    const tab2 = pages[1];

    await tab2.waitForLoadState();
    await tab1.bringToFront();
});

// Verify table contains specific value
test('Verify Table Data',async({page})=>{
    await page.goto('/');
    const tableRow = await page.locator('table tr');
    await expect(tableRow).toContainsText('Sujith');
});

// Intercept an API request and mock the response.
test('Mock API',async(page)=>{
    await page.route('**/apiEndPoint', route =>{
        route.fullFill({
            status:200,
            body: JSON.stringify({name:'Test User'})
        })
    })
})

// Verify element appears after an API call
test('Wait for API response',async(page)=>{
    await page.waitForResponse('**/Api/endpoint');
    await expect(page.locator('.productList').toBeVisible());
})

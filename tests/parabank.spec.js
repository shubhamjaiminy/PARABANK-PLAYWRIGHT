const { test, expect, request } = require('@playwright/test');
import { Basepage } from '../page-objects/basePage';
test.describe('ParaBank Application Tests', () => {
  const baseURL = 'https://parabank.parasoft.com';
  const randomUsername = `user_${Math.random().toString(36).substring(2, 10)}`;
  const password = 'Test@123';

  test('parabank ui and api automation', async ({ page }) => {
    await page.goto(baseURL);
    const basepage = new Basepage(page);
    await basepage.registerUser(randomUsername, password, baseURL);
    await basepage.login(randomUsername, password);
    await basepage.globalMenuVerification(page);
    await basepage.createSavingAccount(page);
    await basepage.transferFunds(page);
    await basepage.billPayment(page);
    ///api test case started
    await basepage.TrasactionByApi(page);
  });
  //   // Navigate to the login page
  //   const basepage = new Basepage(page);
  //   await page.goto(baseURL);
  //   await basepage.registerUser(randomUsername, password, baseURL);
  //   await basepage.login(randomUsername, password);
  //   // Adjust this to match the welcome text or any element that shows up after login

  //   // Get the cookies from the page after logging in
  //   const cookies = await page.context().cookies();

  //   // Find the cookie you want to store (e.g., session or login cookie)
  //   const loginCookie = cookies.find((cookie) => cookie.name === 'JSESSIONID'); // Adjust cookie name as needed

  //   // Store the cookie in a variable (you can also store it in a global variable if needed for reuse)
  //   console.log('Stored Cookie:', loginCookie);
  //   console.log('All cookies:', cookies);

  //   if (loginCookie) {
  //     // Step 2: Set the cookie for the current context to match the API request domain and path
  //     await page.context().addCookies([
  //       {
  //         name: 'JSESSIONID',
  //         value: loginCookie.value,
  //         domain: 'parabank.parasoft.com', // Correct domain
  //         path: '/', // Use '/' path to cover the entire domain
  //         httpOnly: true,
  //         secure: false, // Set to true if using HTTPS
  //       },
  //     ]);
  //   }

  //   // Step 3: Make the GET request using the stored cookie
  //   const response = await fetch(
  //     'https://parabank.parasoft.com/parabank/services_proxy/bank/accounts/14010/transactions/amount/100?timeout=30000',
  //     {
  //       method: 'GET',
  //       headers: {
  //         Cookie: `JSESSIONID=${loginCookie.value}`, // Pass the cookie as part of the request
  //       },
  //     }
  //   );
  //   console.log(`JSESSIONID=${loginCookie.value}`);
  //   // Step 4: Check the response status and body
  //   expect(response.status).toBe(200); // Check if status code is 200
  //   const responseBody = await response.json();
  //   console.log('Response body:', responseBody); // Log the response body

  //   // Example assertion to check if the response contains some expected data
  //   expect(responseBody).toHaveProperty('transactions'); // Example, adjust based on your API response
  // });
});

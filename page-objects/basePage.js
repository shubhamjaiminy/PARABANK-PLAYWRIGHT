import { expect } from 'playwright/test';
let ACCOUNT_NUMBER;
let ACCOUNT_NUMBER_ON_DETAILSPAGE;
export class Basepage {
  constructor(page) {
    this.page = page;
  }
  registerUser = async (randomUsername, password, baseURL) => {
    await this.page.getByRole('link', { name: 'Register' }).click();
    await this.page.locator('[id="customer\\.firstName"]').fill(randomUsername);
    await this.page.locator('[id="customer\\.lastName"]').fill('jaim');
    await this.page
      .locator('[id="customer\\.address\\.street"]')
      .fill('nehru palace');
    await this.page.locator('[id="customer\\.address\\.city"]').fill('jaipur');
    await this.page
      .locator('[id="customer\\.address\\.state"]')
      .fill('rajasthan');
    await this.page
      .locator('[id="customer\\.address\\.zipCode"]')
      .fill('302001');
    await this.page.locator('[id="customer\\.phoneNumber"]').fill('8050737550');
    await this.page.locator('[id="customer\\.ssn"]').fill('1112');
    await this.page.locator('[id="customer\\.username"]').fill(randomUsername);
    await this.page.locator('[id="customer\\.password"]').fill(password);
    await this.page.locator('#repeatedPassword').fill(password);
    await this.page.getByRole('button', { name: 'Register' }).click();
    await this.page.getByText('Your account was created').click();
    await this.page.getByRole('heading', { name: `${randomUsername}` }).click();
    await expect(this.page).toHaveURL(`${baseURL}/parabank/register.htm`);
  };
  login = async (randomUsername, password) => {
    await this.page.getByRole('link', { name: 'Log Out' }).click();
    await this.page.locator('input[name="username"]').fill(randomUsername);
    await this.page.locator('input[name="password"]').fill(password);
    await this.page.getByRole('button', { name: 'Log In' }).click();
  };
  globalMenuVerification = async () => {
    const menuItems = [
      'Open New Account',
      'Transfer Funds',
      'Bill Pay',
      'Find Transactions',
      'Update Contact Info',
      'Request Loan',
      'Log Out',
    ];
    for (const item of menuItems) {
      await expect(this.page.locator(`text=${item}`)).toBeVisible();
    }
  };
  createSavingAccount = async () => {
    await this.page.getByRole('link', { name: 'Open New Account' }).click();
    await this.page.locator('#type').selectOption('1');
    await this.page.waitForTimeout(3000);
    await this.page.getByRole('button', { name: 'Open New Account' }).click();
    await expect(
      this.page.getByRole('heading', { name: 'Account Opened!' })
    ).toBeVisible();
    await expect(
      this.page.getByText('Congratulations, your account')
    ).toBeVisible();
    await expect(this.page.getByText('Your new account number:')).toBeVisible();
    ACCOUNT_NUMBER = await this.page.locator('#newAccountId').textContent();
    await this.page.locator('#newAccountId').click();
    await expect(
      this.page.locator(`//*[text()='Account Details']`)
    ).toBeVisible();
    // check the account type and account number are  same at account details page
    await this.page.waitForTimeout(3000);
    const ACCOUNT_TYPE = await this.page.locator('#accountType').textContent();
    ACCOUNT_NUMBER_ON_DETAILSPAGE = await this.page
      .locator('#accountId')
      .textContent();
    expect(ACCOUNT_TYPE.trim()).toMatch('SAVINGS');
    expect(ACCOUNT_NUMBER.trim()).toMatch(ACCOUNT_NUMBER_ON_DETAILSPAGE);
  };
  transferFunds = async () => {
    await this.page.getByRole('link', { name: 'Transfer Funds' }).click();
    await this.page.locator(`[id="amount"]`).fill('100');
    await this.page.locator('#fromAccountId').selectOption(ACCOUNT_NUMBER);
    await this.page.locator('#toAccountId').selectOption(ACCOUNT_NUMBER);
    await this.page.waitForTimeout(3000);
    await this.page.locator(`[value="Transfer"]`).click();
    await expect(
      this.page.locator(`//*[text()='Transfer Complete!']`)
    ).toBeVisible();
    await expect(
      this.page.getByText(
        `$100.00 has been transferred from account #${ACCOUNT_NUMBER_ON_DETAILSPAGE} to account #${ACCOUNT_NUMBER_ON_DETAILSPAGE}`
      )
    ).toBeVisible();

    await expect(
      this.page.getByText(`See Account Activity for more details.`)
    ).toBeVisible();
  };
  billPayment = async () => {
    await this.page.getByRole('link', { name: 'Bill Pay' }).click();
    await this.page.locator('input[name="payee\\.name"]').fill('john');
    await this.page
      .locator('input[name="payee\\.address\\.street"]')
      .fill('123 Main St');
    await this.page
      .locator('input[name="payee\\.address\\.city"]')
      .fill('Springfield');
    await this.page.locator('input[name="payee\\.address\\.state"]').fill('IL');
    await this.page
      .locator('input[name="payee\\.address\\.zipCode"]')
      .fill('62701');
    await this.page
      .locator('input[name="payee\\.phoneNumber"]')
      .fill('5551234567');
    await this.page
      .locator('input[name="payee\\.accountNumber"]')
      .fill('23001');
    await this.page.locator('input[name="verifyAccount"]').fill('23001');
    await this.page.locator('input[name="amount"]').fill('100');
    await this.page
      .getByRole('combobox')
      .selectOption(ACCOUNT_NUMBER_ON_DETAILSPAGE);
    await this.page.waitForTimeout(3000);
    await this.page.locator(`[value="Send Payment"]`).click({ force: true });
    await expect(
      this.page.getByRole('heading', { name: 'Bill Payment Complete' })
    ).toBeVisible({ timeout: 10000 }); // Increase timeout to 10 seconds
    await expect(
      this.page.getByText(
        `Bill Payment to john in the amount of $100.00 from account ${ACCOUNT_NUMBER_ON_DETAILSPAGE} was successful.`
      )
    ).toBeVisible();
  };
  TrasactionByApi = async () => {
    const cookies = await this.page.context().cookies();

    // Find the cookie you want to store (e.g., session or login cookie)
    const loginCookie = cookies.find((cookie) => cookie.name === 'JSESSIONID'); // Adjust cookie name as needed

    // Store the cookie in a variable (you can also store it in a global variable if needed for reuse)
    console.log('Stored Cookie:', loginCookie);

    const response = await fetch(
      `https://parabank.parasoft.com/parabank/services_proxy/bank/accounts/${ACCOUNT_NUMBER_ON_DETAILSPAGE}/transactions/amount/100?timeout=30000`,
      {
        method: 'GET',
        headers: {
          Cookie: `JSESSIONID=${loginCookie.value}`,
        },
      }
    );
    console.log(`JSESSIONID=${loginCookie.value}`);
    expect(response.status).toBe(200); // Check if status code is 200
    const responseBody = await response.json();
    console.log('Response body:', responseBody); // Log the response body
    expect(Array.isArray(responseBody)).toBe(true); // Ensure the response is an array
    const transaction = responseBody[0]; // Assuming the response contains a list of transactions
    expect(transaction).toHaveProperty('id'); // Check if id exists
    expect(transaction).toHaveProperty(
      'accountId',
      Number(ACCOUNT_NUMBER_ON_DETAILSPAGE)
    );
  };
}

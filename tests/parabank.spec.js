const { test, expect } = require('@playwright/test');
import { Basepage } from '../page-objects/basePage';
test.describe('ParaBank Application Tests', () => {
  const baseURL = 'https://parabank.parasoft.com';
  const randomUsername = `user_${Math.random().toString(36).substring(2, 10)}`;
  const password = 'Test@123';

  test('test', async ({ page }) => {
    await page.goto(baseURL);
    const basepage = new Basepage(page);
    await basepage.registerUser(randomUsername, password, baseURL);
    await basepage.login(randomUsername, password);
    await basepage.globalMenuVerification(page);
    await basepage.createSavingAccount(page);
    await basepage.transferFunds(page);
    await basepage.billPayment(page);
  });

  // Step 4: Verify the global navigation menu

  //     // Step 5: Create a Savings account
  //     await page.click('text=Open New Account');
  //     await page.selectOption('#type', '1'); // Select Savings account
  //     await page.click('input[type="submit"][value="Open New Account"]');
  //     const accountNumber = await page.locator('#newAccountId').textContent();
  //     expect(accountNumber).not.toBeNull();

  //     // Step 6: Validate Accounts Overview
  //     await page.click('text=Accounts Overview');
  //     const balance = await page
  //       .locator(`text=${accountNumber}`)
  //       .locator('..')
  //       .locator('.balance')
  //       .textContent();
  //     expect(parseFloat(balance)).toBeGreaterThanOrEqual(0);

  //     // Step 7: Transfer funds
  //     await page.click('text=Transfer Funds');
  //     await page.fill('#amount', '50');
  //     await page.selectOption('#fromAccountId', accountNumber.trim());
  //     await page.selectOption('#toAccountId', '54321'); // Assuming another account exists
  //     await page.click('input[type="submit"][value="Transfer"]');
  //     await expect(page.locator('text=Transfer Complete')).toBeVisible();

  //     // Step 8: Pay a bill
  //     await page.click('text=Bill Pay');
  //     await page.fill('#payeeName', 'Test Payee');
  //     await page.fill('#payeeAddressStreet', '456 Test Street');
  //     await page.fill('#payeeAddressCity', 'TestCity');
  //     await page.fill('#payeeAddressState', 'TestState');
  //     await page.fill('#payeeAddressZip', '67890');
  //     await page.fill('#payeePhoneNumber', '9876543210');
  //     await page.fill('#accountNumber', accountNumber.trim());
  //     await page.fill('#verifyAccount', accountNumber.trim());
  //     await page.fill('#amount', '20');
  //     await page.click('input[type="submit"][value="Send Payment"]');
  //     await expect(page.locator('text=Bill Payment Complete')).toBeVisible();
});

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
});

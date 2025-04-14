const { test, expect, request } = require('@playwright/test');
import { BasePage } from '../page-objects/basePage';
import {generateRandomUsername} from '../utils/helpers';
require('dotenv').config();
test.describe('ParaBank Application Tests', () => {
  const baseURL = process.env.BASE_URL;
  const randomUsername = generateRandomUsername();
  const password = 'Test@123';

  test('parabank ui and api automation', async ({ page }) => {
    await page.goto(baseURL);
    const basepage = new BasePage(page);
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

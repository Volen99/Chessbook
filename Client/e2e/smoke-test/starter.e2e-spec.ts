import { browser } from 'protractor';
import { testUserInit } from './common.test';


describe('Smoke Test for Starter Bundle', () => {
  beforeEach(testUserInit);

  it('Starter should be opened without errors', async () => {
    // just open the page and check there's no errors in log
    await browser.get(`${browser.baseUrl}/starter`);
  });

  it('Users List should be opened without errors', async () => {
    // just open the page and check there's no errors in log
    await browser.get(`${browser.baseUrl}/users/list`);
  });

  it('Current User Profile should be opened without errors', async () => {
    // just open the page and check there's no errors in log
    await browser.get(`${browser.baseUrl}/users/current`);
  });
});

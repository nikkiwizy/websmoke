import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginpage';
import { NavBar } from '../pages/NavBar';

import 'dotenv/config'
import { faker } from '@faker-js/faker';

test.describe.serial('Login Google', () => {
    test('Registered', async ({page}) => {
    const loginpage = new LoginPage(page);
    const navbar = new NavBar(page);
    let url = process.env.STAGING
    await loginpage.navigate(url);
    await loginpage.googleLogin(process.env.GOOGLE_EMAIL ,process.env.GOOGLE_PW)
    await navbar.logout();
   });

   test('Unregistered', async ({page}) => {
    const loginpage = new LoginPage(page);
    let url = process.env.STAGING
    await loginpage.navigate(url);
    await loginpage.googleLogin(process.env.GOOGLE_UNREG ,process.env.GOOGLE_UNREGPW)
    await loginpage.verifyUnregisteredLogin(process.env.GOOGLE_UNREG);

   });
});

test.describe.serial('Login Local', () => {
  let page;
  test.beforeAll(async({browser}) => {
    page = await browser.newPage();
  }
  )

  test.afterAll(async () => {
    await page.close();
  });

  test('Invalid Username', async ({}) => {
    const loginpage = new LoginPage(page);
    let url = process.env.STAGING
    await loginpage.navigate(url);
    await loginpage.login(faker.internet.userName() ,process.env.LOCAL_PW)
    await loginpage.verifyIncorrectCredentialsMsg();      
   });

  test('Valid Username', async ({}) => {
    const loginpage = new LoginPage(page);
    const navbar = new NavBar(page);
    await loginpage.login(process.env.LOCAL_UN ,process.env.LOCAL_PW)
    await navbar.logout();
    await loginpage.verifyLandingOnLoginPage();

   });

   test('Invalid Password', async ({}) => {
    const loginpage = new LoginPage(page);
    await loginpage.login(process.env.LOCAL_EMAIL ,faker.internet.password())
    await loginpage.verifyIncorrectCredentialsMsg();
   });

   test('Valid Email', async ({}) => {
    const loginpage = new LoginPage(page);
    const navbar = new NavBar(page);
    await loginpage.login(process.env.LOCAL_EMAIL ,process.env.LOCAL_EMAILPW)
    await navbar.logout();
    await loginpage.verifyLandingOnLoginPage();

   });

});

 


 // await page.goto('https://auth.eu.wizyvision.app/');
  // await page.locator("//div[@data-testid='GoogleButton']").click();
  // await page.locator("input[type='email']").fill("wizytester0@gmail.com")
  // await page.locator("[id='identifierNext'] button").click();
  // await page.locator("input[type='password']").fill("horseshoe54e");
  // await page.locator('#passwordNext').click();

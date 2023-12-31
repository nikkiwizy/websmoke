import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginpage';
import { NavBar } from '../pages/NavBar';
import { basePage } from '../pages/basePage';
import { HomePage } from '../pages/HomePage';
import { DomainPage } from '../pages/DomainPage';
import { AppPage } from '../pages/AppPage';
import 'dotenv/config'
import { faker } from '@faker-js/faker';



test.describe.serial('Search', () => {
  let page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  }
  )

  test.afterAll(async () => {
    await page.close();
  });

  test('Basic Search -> Files (File Name)', async ({ }) => {
    const lp = new LoginPage(page);
    const nb = new NavBar(page);
    const dp = new DomainPage(page);

    const filename = "IMG_1703324752296.png";

    await lp.navigate(process.env.STAGING);
    await lp.login(process.env.OWNERUN, process.env.OWNERPW)
    await nb.fillSearchBar(filename,"All Assets")
    await expect(dp.filesInFileList).toBeEnabled({timeout:60000})
    await dp.filesInFileList.first().click();
    await expect(dp.fileNameInFileView).toContainText(filename,{timeout:20000})
    await dp.backBtnFileView.click();
  })
  test('Basic Search -> Case (Case Number)', async ({ }) => {
    const lp = new LoginPage(page);
    const nb = new NavBar(page);
    const ap = new AppPage(page);

    const caseNumber = "WV-29";
    const appName = "ForSearching"

    await nb.fillSearchBar(caseNumber,appName)
    await expect(ap.caseNumbersInCaselist).toBeEnabled({timeout:60000})
    await expect(ap.caseNumbersInCaselist.first()).toContainText(caseNumber,{timeout:20000})
  }
  )


});
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginpage';
import { NavBar } from '../pages/NavBar';
import { basePage } from '../pages/basePage';
import { HomePage } from '../pages/HomePage';
import { DomainPage } from '../pages/DomainPage';
import 'dotenv/config'
import { faker } from '@faker-js/faker';


test.describe.serial('Upload In All Asset', () => {
  let page;

  test.beforeAll(async({browser}) => {
    page = await browser.newPage();
  }
  )

  test.afterAll(async () => {
    await page.close();
  });

  test('Upload file via browsing from computer', async ({}) => {
    let numberOfUploadedFiles = 1;
    const loginpage = new LoginPage(page);
    const BP = new basePage(page);
    const homepage = new HomePage(page);
    const domainpage = new DomainPage(page);
    await loginpage.navigate(process.env.STAGING);
    await loginpage.login(process.env.OWNERUN ,process.env.OWNERPW)
    await BP.clickElementWithText(homepage.dactext,"All Assets")
    const fileListBeforeUpload = await domainpage.uploadFile(domainpage.inputFile, numberOfUploadedFiles,'./resources/validFiles', domainpage.uploadDialogFileNames);
    await domainpage.backToHome();
    await domainpage.switchToLatestUpload();
    const fileListAfterUpload = await domainpage.hoverAndGetTooltipText(fileListBeforeUpload.length,domainpage.filesInFileList,domainpage.tooltipText);
    expect(fileListBeforeUpload).toEqual(expect.arrayContaining(fileListAfterUpload));
    
  });
  
  test('Upload file via Capturing  Photos', async ({}) => {
    const domainpage = new DomainPage(page);
    const filesListBeforeUpload = await domainpage.uploadViaCapture(domainpage.uploadDialogFileNames);
    await domainpage.backToHome();
    const fileListAfterUpload = await domainpage.hoverAndGetTooltipText(filesListBeforeUpload.length,domainpage.filesInFileList,domainpage.tooltipText);
    expect(filesListBeforeUpload).toEqual(expect.arrayContaining(fileListAfterUpload));

  });

});


test.describe.serial('Create Case in All Asset', () => {
  let page;

  test.beforeAll(async({browser}) => {
    page = await browser.newPage();
  }
  )

  test.afterAll(async () => {
    await page.close();
  });

  test('[In Progress] Multi-Select and Create Case', async ({}) => {
    let numberOfFilesToCreateCase = 5;
    let appname = "Normal Application"
    const loginpage = new LoginPage(page);
    const BP = new basePage(page);
    const homepage = new HomePage(page);
    const domainpage = new DomainPage(page);
    await loginpage.navigate(process.env.STAGING);
    await loginpage.login(process.env.OWNERUN ,process.env.OWNERPW)
    await BP.clickElementWithText(homepage.dactext,"All Assets")
    await domainpage.hoverAndMultiSelect(numberOfFilesToCreateCase,domainpage.filesInFileList, domainpage.checkBoxPerFile);
    await domainpage.createCaseFromDAC(domainpage.createCaseFromHeader, appname)
    await BP.clickSubmitBtn();
    const casenumber = await BP.clickAndGetCaseNumberSnackBar();
    await expect(BP.caseNumberCaseView).toBeVisible({timeout:30000});
    await expect(BP.caseNumberCaseView).toContainText(casenumber)
    await expect(BP.appNameCaseView).toContainText(appname)

  });
  
  test('[In Progress] View a File then Create thru Toolbar', async ({}) => {
    let appname = "Normal Application"
    const BP = new basePage(page);
    const homepage = new HomePage(page);
    const domainpage = new DomainPage(page);
    const navbar = new NavBar(page);

    await navbar.clickLogo();
    await BP.clickElementWithText(homepage.dactext,"All Assets");
    await expect(domainpage.filesInFileList.first()).toBeVisible({ timeout: 50000 });
    await domainpage.filesInFileList.first().click();
    await domainpage.createCaseFromDAC(domainpage.createCaseBtnFileView, appname)
    await BP.clickSubmitBtn();
    const casenumber = await BP.clickAndGetCaseNumberSnackBar();
    await expect(BP.caseNumberCaseView).toBeVisible({timeout:30000});
    await expect(BP.caseNumberCaseView).toContainText(casenumber)
    await expect(BP.appNameCaseView).toContainText(appname)
    

  });

});

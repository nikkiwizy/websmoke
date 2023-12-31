import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginpage';
import { NavBar } from '../pages/NavBar';
import { basePage } from '../pages/basePage';
import { HomePage } from '../pages/HomePage';
import { DomainPage } from '../pages/DomainPage';
import 'dotenv/config'
import { AppPage } from '../pages/AppPage';

test.describe.serial('Delete File In All Assets & Domain', () => {
  let page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    const lp = new LoginPage(page);
    await lp.navigate(process.env.STAGING);
    await lp.login(process.env.DELETER_UN, process.env.DELETER_PW)
  }
  )

  test.afterAll(async () => {
    await page.close();
  });

  
  test('Multi-Select Files (All Assets)', async ({ }) => {
    let domainname = "All Assets"
    let numberOfFiles = 3
    const bp = new basePage(page);
    const hp = new HomePage(page);
    const dp = new DomainPage(page);
    
    await bp.clickElementWithText(hp.dactext,  domainname);
    await expect(dp.filesInFileList.first()).toBeVisible({ timeout: 50000 });
    await dp.switchToLatestUpload();
    const fileToDelete = await bp.hoverAndGetTooltipText(numberOfFiles,dp.filesInFileList,dp.tooltipText)
    await dp.hoverAndMultiSelect(numberOfFiles,dp.filesInFileList,dp.checkBoxPerFile)
    await dp.deleteFileFromHeader.click()
    await bp.submitBtn.click();
    await expect(dp.filesInFileList.first()).toBeVisible({ timeout: 50000 });
    const newFiles = await bp.hoverAndGetTooltipText(numberOfFiles,dp.filesInFileList,dp.tooltipText)
    expect(fileToDelete.sort()).not.toEqual(newFiles.sort());
  });

  test('Delete thru File View  (Domain)', async ({ }) => {
    let domainname = "Do Not Delete & Update"
    
    const bp = new basePage(page);
    const hp = new HomePage(page);
    const dp = new DomainPage(page);
    const nb = new NavBar(page);

    await nb.clickLogo();
    await bp.clickElementWithText(hp.dactext,  domainname);
    await expect(dp.filesInFileList.first()).toBeVisible({ timeout: 50000 });
    const fileToDelete = await bp.hoverAndGetTooltipText(1,dp.filesInFileList,dp.tooltipText)
    await dp.filesInFileList.first().click();
    await dp.deleteFileBtnFileView.click();
    await bp.submitBtn.click();
    await nb.fillSearchBar(fileToDelete[0], "in this domain")
    await expect(dp.emptyView.last()).toBeVisible({timeout:45000})

  });
})

test.describe.serial('View File in All Assets', () => {
  let page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    const lp = new LoginPage(page);
    const hp = new HomePage(page);
    const bp = new basePage(page);

    await lp.navigate(process.env.STAGING);
    await lp.login(process.env.OWNERUN, process.env.OWNERPW)
    await bp.clickElementWithText(hp.dactext,  "All Assets");
  }
  )
  

  test.afterEach(async () => {
    const dp = new DomainPage(page);
    await dp.backBtnFileView.click()
    

  });

  test.afterAll(async () => {
    await page.close();
  });

  
  test('View Image File in the File List', async ({ }) => {
    let filename = "imagesampleimagesample.png"
    const dp = new DomainPage(page);
    const nb = new NavBar(page);
    await expect(dp.filesInFileList.first()).toBeVisible({ timeout: 50000 });
    await nb.fillSearchBar(filename,"All Assets")
    await expect(dp.filesInFileList.first()).not.toBeVisible({ timeout: 50000 });
    await expect(dp.filesInFileList.first()).toBeVisible({ timeout: 50000 });
    await dp.filesInFileList.first().click()
    await expect(await page.locator('[data-testid="MainLayout"] img').last()).toBeVisible({timeout:25000})
   
  });

  test('View Video File in the File List', async ({ }) => {
    let filename = "videosamplevideosample.mp4"
    const dp = new DomainPage(page);
    const nb = new NavBar(page);
    await expect(dp.filesInFileList.first()).toBeVisible({ timeout: 50000 });
    await nb.fillSearchBar(filename,"All Assets")
    await expect(dp.filesInFileList.first()).not.toBeVisible({ timeout: 50000 });
    await expect(dp.filesInFileList.first()).toBeVisible({ timeout: 50000 });
    await dp.filesInFileList.first().click()
    await expect(await page.locator('[data-testid="VideoPlayer"] video')).toBeVisible({timeout:25000})
   
  });
  
  test('View PDF File in the File List', async ({ }) => {
    let filename = "pdfsamplepdfsample.pdf"
    const dp = new DomainPage(page);
    const nb = new NavBar(page);
    await expect(dp.filesInFileList.first()).toBeVisible({ timeout: 50000 });
    await nb.fillSearchBar(filename,"All Assets")
    await expect(dp.filesInFileList.first()).not.toBeVisible({ timeout: 50000 });
    await expect(dp.filesInFileList.first()).toBeVisible({ timeout: 50000 });
    await dp.filesInFileList.first().click()
    await expect(await page.locator("iframe[title='pdfsamplepdfsample.pdf']")).toBeVisible({timeout:25000})
   
  });
})

test.describe.serial('Filters in All Assets', () => {
  let page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    const lp = new LoginPage(page);
    await lp.navigate(process.env.STAGING);
    await lp.login(process.env.OWNERUN, process.env.OWNERPW)
    }
  )

  test.afterAll(async () => {
    await page.close();
  });

  
  test('Multi-Select in Privacy Filter and Single Select Quality Filter', async ({ }) => {
    const bp = new basePage(page);
    const hp = new HomePage(page);
    const dp = new DomainPage(page);
    let domainname = "All Assets"
    const privacies: string[] = ['high-quality-images','standard'];


    await bp.clickElementWithText(hp.dactext,  domainname);
    await expect(dp.filesInFileList.first()).toBeVisible({ timeout: 50000 });
    await dp.privacyFilter.click()
    await dp.clickElementWithText(dp.filterPrivacyTypeQuality,privacies[0])
    await dp.clickElementWithText(dp.filterPrivacyTypeQuality,privacies[1])
    await page.keyboard.press('Escape');
    await dp.qualityFilter.click()
    await dp.clickElementWithText(dp.filterPrivacyTypeQuality,"High")
    await page.keyboard.press('Escape');
    await expect(dp.filesInFileList.first()).toBeVisible({ timeout: 50000 });
    await dp.filesInFileList.first().click();
    await bp.clickElementWithText(dp.fileDetailsSections,"Privacy")
    let initialPrivacy = await dp.privacyBtnFileView.innerText()
    expect(privacies).toContain(initialPrivacy)
    await dp.backBtnFileView.click();
  });
  test('Unselect in Privacy Filter and Quality Filter', async ({ }) => {
    const bp = new basePage(page);
    const dp = new DomainPage(page);
    const nb = new NavBar(page);

    const privacies: string[] = ['high-quality-images','standard'];
    await expect(dp.filesInFileList.first()).toBeVisible({ timeout: 50000 });
    await dp.privacyFilter.click()
    for (const privacy of privacies) {
      await dp.clickElementWithText(dp.filterPrivacyTypeQuality, privacy);
    }
    await page.keyboard.press('Escape');
    await dp.qualityFilter.click()
    await dp.clickElementWithText(dp.filterPrivacyTypeQuality,"High")
    await page.keyboard.press('Escape');
    await bp.delay(5000)
    await expect(await dp.headerButtons.count()).toEqual(6)
    await nb.clickLogo();

  });

  test('Single/Multi Select in Tag Filter', async ({ }) => {
    const bp = new basePage(page);
    const hp = new HomePage(page);
    const dp = new DomainPage(page);
    const nb = new NavBar(page);
    let domainname = "All Assets"
    let desiredTag = "TagForAutomation"
    await bp.clickElementWithText(hp.dactext,  domainname);
    await expect(dp.filesInFileList.first()).toBeVisible({ timeout: 50000 });
    await bp.clickElementWithinElement(dp.tagsNames, dp.inputCheckBoxTags, desiredTag )
    await expect(dp.filesInFileList.first()).toBeVisible({ timeout: 50000 });
    await dp.filesInFileList.first().click()
    await bp.clickElementWithText(dp.fileDetailsSections,"Tags")
    let tagsFromFileView = await dp.getTextOfElements(dp.enterpriseTagsFileDetails)
    await bp.delay(1000)
    expect(tagsFromFileView).toContain(desiredTag);
    await dp.nextBtnFileView.click();
    await bp.clickElementWithText(dp.fileDetailsSections,"Tags")
    tagsFromFileView = await dp.getTextOfElements(dp.enterpriseTagsFileDetails)
    await bp.delay(1000)
    expect(tagsFromFileView).toContain(desiredTag);
    await dp.backBtnFileView.click();
    await nb.clickLogo();
  });

  test('Multiselect Tag Filter and Latest Upload', async ({ }) => {
    const bp = new basePage(page);
    const hp = new HomePage(page);
    const dp = new DomainPage(page);
    const nb = new NavBar(page);
    let domainname = "All Assets"
    const tags: string[] = ['TagForAutomation','Do Not Delete & Update'];

    await bp.clickElementWithText(hp.dactext,  domainname);
    await expect(dp.filesInFileList.first()).toBeVisible({ timeout: 50000 });
    await dp.switchToLatestUpload()
    await expect(dp.filesInFileList.first()).toBeVisible({ timeout: 50000 });
    await bp.clickElementWithinElement(dp.tagsNames, dp.inputCheckBoxTags, tags[0] )
    await expect(dp.filesInFileList.first()).toBeVisible({ timeout: 50000 });
    await bp.clickElementWithinElement(dp.tagsNames, dp.inputCheckBoxTags, tags[1] )
    await expect(dp.filesInFileList.first()).toBeVisible({ timeout: 50000 });
    await dp.filesInFileList.first().click()
    await bp.clickElementWithText(dp.fileDetailsSections,"Tags")
    let tagsFromFileView = await dp.getTextOfElements(dp.enterpriseTagsFileDetails)
    await bp.delay(1000)
    expect(tagsFromFileView).toContain(tags[0]);
    expect(tagsFromFileView).toContain(tags[1]);
    await dp.nextBtnFileView.click();
    await bp.clickElementWithText(dp.fileDetailsSections,"Tags")
    tagsFromFileView = await dp.getTextOfElements(dp.enterpriseTagsFileDetails)
    await bp.delay(1000)
    expect(tagsFromFileView).toContain(tags[0]);
    expect(tagsFromFileView).toContain(tags[1]);
    await dp.backBtnFileView.click();
    await nb.clickLogo();
  });
})

test.describe.serial('Upload In All Assets & Domain', () => {
  let page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    const loginpage = new LoginPage(page);
    await loginpage.navigate(process.env.STAGING);
    await loginpage.login(process.env.OWNERUN, process.env.OWNERPW)
  }
  )

  test.afterAll(async () => {
    await page.close();
  });

  test('Upload file via browsing from computer (All assets)', async ({ }) => {
    let numberOfUploadedFiles = 1;
    const BP = new basePage(page);
    const homepage = new HomePage(page);
    const domainpage = new DomainPage(page);
    
    await BP.clickElementWithText(homepage.dactext, "All Assets")
    const filesListBeforeUpload = await domainpage.uploadFile(domainpage.inputFile, numberOfUploadedFiles, './resources/validFiles', domainpage.uploadDialogFileNames);
    await domainpage.backToHome();
    await domainpage.switchToLatestUpload();
    const fileListAfterUpload = await domainpage.hoverAndGetTooltipText(filesListBeforeUpload.length, domainpage.filesInFileList, domainpage.tooltipText);
    expect(filesListBeforeUpload.sort()).toEqual(fileListAfterUpload.sort());

  });

  test('Upload file via Capturing  Photos (All assets)', async ({ }) => {
    const domainpage = new DomainPage(page);
    const filesListBeforeUpload = await domainpage.uploadViaCapture(domainpage.uploadDialogFileNames);
    await domainpage.backToHome();
    const fileListAfterUpload = await domainpage.hoverAndGetTooltipText(filesListBeforeUpload.length, domainpage.filesInFileList, domainpage.tooltipText);
    expect(filesListBeforeUpload.sort()).toEqual(fileListAfterUpload.sort());
    

  });

  test('Upload multiple files (Domain)', async ({ }) => {
    let numberOfUploadedFiles = 15;
    let domainName = "Do Not Delete & Update";
    const BP = new basePage(page);
    const nb = new NavBar(page);
    const homepage = new HomePage(page);
    const domainpage = new DomainPage(page);
    await nb.clickLogo();
    await BP.clickElementWithText(homepage.dactext, domainName)
    const fileListBeforeUpload = await domainpage.uploadFile(domainpage.inputFile, numberOfUploadedFiles, './resources/validFiles', domainpage.uploadDialogFileNames);
    await domainpage.backToHome();
    await domainpage.switchToLatestUpload();
    const fileListAfterUpload = await domainpage.hoverAndGetTooltipText(fileListBeforeUpload.length, domainpage.filesInFileList, domainpage.tooltipText);
    expect(fileListBeforeUpload.sort()).toEqual(fileListAfterUpload.sort());
  });

  
  test('Upload video file (Domain)', async ({ }) => {
    let numberOfUploadedFiles = 1;
    const domainpage = new DomainPage(page);
    const fileListBeforeUpload = await domainpage.uploadFile(domainpage.inputFile, numberOfUploadedFiles, './resources/videoFiles', domainpage.uploadDialogFileNames);
    await domainpage.backToHome();
    await domainpage.switchToLatestUpload();
    const fileListAfterUpload = await domainpage.hoverAndGetTooltipText(fileListBeforeUpload.length, domainpage.filesInFileList, domainpage.tooltipText);
    expect(fileListBeforeUpload.sort()).toEqual(fileListAfterUpload.sort());
  });
});

test.describe.serial('Create Case in All Assets', () => {
  let page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  }
  )

  test.afterAll(async () => {
    await page.close();
  });

  test('Multi-Select and Create Case', async ({ }) => {
    let numberOfFilesToCreateCase = 5;
    let appname = "Normal Application"
    const loginpage = new LoginPage(page);
    const ap = new AppPage(page);
    const BP = new basePage(page);
    const homepage = new HomePage(page);
    const domainpage = new DomainPage(page);
    await loginpage.navigate(process.env.STAGING);
    await loginpage.login(process.env.OWNERUN, process.env.OWNERPW)
    await BP.clickElementWithText(homepage.dactext, "All Assets")
    await domainpage.hoverAndMultiSelect(numberOfFilesToCreateCase, domainpage.filesInFileList, domainpage.checkBoxPerFile);
    await domainpage.createCaseFromDAC(domainpage.createCaseFromHeader, appname)
    await BP.clickSubmitBtn();
    const casenumber = await BP.clickAndGetCaseNumberSnackBar();
    await expect(ap.caseNumberCaseView).toBeVisible({ timeout: 30000 });
    await expect(ap.caseNumberCaseView).toContainText(casenumber)
    await expect(ap.appNameCaseView).toContainText(appname)

  });

  test('View a File then Create thru Toolbar', async ({ }) => {
    let appname = "Normal Application"
    let domainname = "Do Not Delete & Update"
    const BP = new basePage(page);
    const homepage = new HomePage(page);
    const domainpage = new DomainPage(page);
    const navbar = new NavBar(page);
    const ap = new AppPage(page);

    await navbar.clickLogo();
    await BP.clickElementWithText(homepage.dactext,  domainname);
    await expect(domainpage.filesInFileList.first()).toBeVisible({ timeout: 50000 });
    await domainpage.filesInFileList.first().click();
    await domainpage.createCaseFromDAC(domainpage.createCaseBtnFileView, appname)
    await BP.clickSubmitBtn();
    const casenumber = await BP.clickAndGetCaseNumberSnackBar();
    await expect(ap.caseNumberCaseView).toBeVisible({ timeout: 30000 });
    await expect(ap.caseNumberCaseView).toContainText(casenumber)
    await expect(ap.appNameCaseView).toContainText(appname)


  });

  test('View a File then Create Case thru File Details in Application', async ({ }) => {
    let appname = "ForSearching"
    let domainname = "All Assets"
    const BP = new basePage(page);
    const homepage = new HomePage(page);
    const domainpage = new DomainPage(page);
    const navbar = new NavBar(page);
    const ap = new AppPage(page);

    await navbar.clickLogo();
    await BP.clickElementWithText(homepage.dactext,  domainname);
    await expect(domainpage.filesInFileList.first()).toBeVisible({ timeout: 50000 });
    await domainpage.filesInFileList.first().click();
    await BP.clickElementWithText(domainpage.fileDetailsSections,"Applications")
    await domainpage.createCaseFromDAC(domainpage.createCaseInFileDetails, appname)
    await BP.clickSubmitBtn();
    const casenumber = await BP.clickAndGetCaseNumberSnackBar();
    await expect(ap.caseNumberCaseView).toBeVisible({ timeout: 30000 });
    await expect(ap.caseNumberCaseView).toContainText(casenumber)
    await expect(ap.appNameCaseView).toContainText(appname)


  });

  test('Add File to a Case', async ({ }) => {
    let appname = "ForSearching"
    let domainname = "All Assets"
    const BP = new basePage(page);
    const homepage = new HomePage(page);
    const domainpage = new DomainPage(page);
    const navbar = new NavBar(page);
    const ap = new AppPage(page);

    await navbar.clickLogo();
    await BP.clickElementWithText(homepage.dactext,  domainname);
    await expect(domainpage.filesInFileList.first()).toBeVisible({ timeout: 50000 });
    await domainpage.filesInFileList.first().click();
    await BP.clickElementWithText(domainpage.fileDetailsSections,"Applications")
    await domainpage.createCaseFromDAC(domainpage.addToCaseInFileDetails, appname)
    await BP.delay(5000)
    const caseNum = await ap.caseNumbersInCaselist.first().innerText()
    console.log(caseNum)
    await ap.casesInAddToCaselist.first().click()
    await BP.clickSubmitBtn();
    await BP.delay(5000)

    const caseNumbers = await BP.getTextOfElements(domainpage.caseListInAppsFileDetails)
    await BP.delay(10000)
    expect(caseNumbers).toContain(caseNum);

  });

});

test.describe.serial('Update File in All Assets', () => {
  let page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    const lp = new LoginPage(page);
    await lp.navigate(process.env.STAGING);
    await lp.login(process.env.OWNERUN, process.env.OWNERPW)
  }
  )

  test.afterAll(async () => {
    await page.close();
  });

  
  test('Multi-Select and Update Tag and add Enterprise tag', async ({ }) => {
    let domainname = "All Assets"
    let numberOfFiles = 2
    let tagName = "TagForAutomation"
    const bp = new basePage(page);
    const hp = new HomePage(page);
    const dp = new DomainPage(page);

    await bp.clickElementWithText(hp.dactext,  domainname);
    await expect(dp.filesInFileList.first()).toBeVisible({ timeout: 50000 });
    await dp.switchToLatestUpload();
    await dp.hoverAndMultiSelect(numberOfFiles,dp.filesInFileList,dp.checkBoxPerFile)
    await dp.updateTagsFromHeader.click()
    await dp.addTagBtnFromHeader.click()
    await dp.enterpriseTagsFromDialog.fill(tagName)
    await bp.clickElementWithText(dp.tagTextFromDialogDropDown, tagName)
    await bp.submitBtn.click(); 
    await bp.delay(2000)
    await bp.cancelBtn.click();
    await dp.filesInFileList.first().click()
    await expect(dp.filesInFileList.first()).toBeVisible({ timeout: 50000 });
    await bp.clickElementWithText(dp.fileDetailsSections,"Tags")
    let tagsFromFileView = await dp.getTextOfElements(dp.enterpriseTagsFileDetails)
    await bp.delay(1000)
    expect(tagsFromFileView).toContain(tagName);
    await dp.nextBtnFileView.click();
    await bp.clickElementWithText(dp.fileDetailsSections,"Tags")
    tagsFromFileView = await dp.getTextOfElements(dp.enterpriseTagsFileDetails)
    await bp.delay(1000)
    expect(tagsFromFileView).toContain(tagName);
    await dp.backBtnFileView.click();

  });
  test('View a File then Update the Privacy in file details', async ({ }) => {
    const bp = new basePage(page);
    const hp = new HomePage(page);
    const dp = new DomainPage(page);
    const nb = new NavBar(page);

    await expect(dp.filesInFileList.first()).toBeVisible({ timeout: 50000 });
    await dp.filesInFileList.first().click();
    await bp.clickElementWithText(dp.fileDetailsSections,"Privacy")
    let initialPrivacy = await dp.privacyBtnFileView.innerText()
    await dp.privacyBtnFileView.click()
    if (initialPrivacy === "confidential") {
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
    } else {
      await page.keyboard.press('ArrowDown');
    }
    await await page.keyboard.press('Enter');
    await bp.delay(3000)
    let modifiedPrivacy = await dp.privacyBtnFileView.innerText()
    expect(modifiedPrivacy).not.toEqual(initialPrivacy)
  });
})

test.describe.serial('Filters in Domain', () => {
  let page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    const lp = new LoginPage(page);
    await lp.navigate(process.env.STAGING);
    await lp.login(process.env.OWNERUN, process.env.OWNERPW)
    }
  )

  test.afterAll(async () => {
    await page.close();
  });

  
  test('Multi-Select in Type Filter and Multi-Select in Uploader Filter', async ({ }) => {
    const bp = new basePage(page);
    const hp = new HomePage(page);
    const dp = new DomainPage(page);

    const uploaders: string[] = ['Automation Automation Nix','Automated Deletion'];
    const types: string[] = ['Image','PDF'];
    const extensionsForImageAndPDF: string[] = ['jpeg','png','jpg','pdf'];
    let domainname = "ForFilter"

    await bp.clickElementWithText(hp.dactext,  domainname);
    await expect(dp.filesInFileList.first()).toBeVisible({ timeout: 50000 });
    await dp.typeFilter.click()
    for (const type of types) {
      await dp.clickElementWithText(dp.filterPrivacyTypeQuality, type);
    }
    await page.keyboard.press('Escape');
    await dp.uploaderFilter.click()
    for (const uploader of uploaders) {
      await dp.clickElementWithText(dp.dialogFilterUploader, uploader);
    }
    await page.keyboard.press('Escape');
    await expect(dp.filesInFileList.first()).toBeVisible({ timeout: 50000 });
    await dp.filesInFileList.last().click();
    let fileExtension = bp.getFileExtension((await dp.fileNameInFileView.innerText()))
    expect(extensionsForImageAndPDF).toContain(fileExtension)
    await bp.clickElementWithText(dp.fileDetailsSections,"File")
    let fileUploader = await page.locator('[data-testid="connectComponent"] div').innerText()
    expect(uploaders).toContain(fileUploader)
    await dp.backBtnFileView.click()
    

  });
  
  test('Unselect in Privacy Filter and Quality Filter', async ({ }) => {
    const bp = new basePage(page);
    const dp = new DomainPage(page);
    const nb = new NavBar(page);
    const uploaders: string[] = ['Automation Automation Nix','Automated Deletion'];
    const types: string[] = ['Image','PDF'];

    await expect(dp.filesInFileList.first()).toBeVisible({ timeout: 50000 });
    await dp.typeFilter.click()

    for (const type of types) {
      await dp.clickElementWithText(dp.filterPrivacyTypeQuality, type);
    }

    await page.keyboard.press('Escape');
    await dp.uploaderFilter.click()

    for (const uploader of uploaders) {
      await dp.clickElementWithText(dp.dialogFilterUploader, uploader);
    }

    await page.keyboard.press('Escape');
    await bp.delay(5000)
    expect(await dp.headerButtons.count()).toEqual(6)
    await nb.clickLogo();

  });

  test('Single/Multi Select in Tag Filter', async ({ }) => {
    const bp = new basePage(page);
    const hp = new HomePage(page);
    const dp = new DomainPage(page);
    const nb = new NavBar(page);
    let domainname = "ForFilter"
    const tags: string[] = ['ForFilter','PDF'];

    await bp.clickElementWithText(hp.dactext,  domainname);
    await expect(dp.filesInFileList.first()).toBeVisible({ timeout: 50000 });

    for(const tag of tags){
    await bp.clickElementWithinElement(dp.tagsNamesDomain, dp.inputCheckBoxTagsDomain, tag )
    await expect(dp.filesInFileList.first()).toBeVisible({ timeout: 50000 });
    }

    await dp.filesInFileList.first().click()
    await bp.clickElementWithText(dp.fileDetailsSections,"Tags")
    let tagsFromFileView = await dp.getTextOfElements(dp.enterpriseTagsFileDetails)
    await bp.delay(1000)

    for(const tag of tags){
      expect(tagsFromFileView).toContain(tag);
    }

    await dp.backBtnFileView.click();
    await dp.resetTagsBtn.click();
    await expect(dp.resetTagsBtn).not.toBeVisible()
    await nb.clickLogo();

  });
  test('Map Filter', async ({ }) => {
    const bp = new basePage(page);
    const hp = new HomePage(page);
    const dp = new DomainPage(page);
    const nb = new NavBar(page);
    let domainname = "ForFilter"
    

    await bp.clickElementWithText(hp.dactext,  domainname);
    await expect(dp.filesInFileList.first()).toBeVisible({ timeout: 50000 });
    await dp.switchToMapView()
    await page.locator("(//div[@role='dialog'] //button[@type='button'])[2]").click()
    await expect(page.locator('[aria-label="Map"]')).toBeVisible()
    await nb.clickLogo();

  });
})
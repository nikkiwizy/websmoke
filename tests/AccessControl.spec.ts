import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginpage';
import { NavBar } from '../pages/NavBar';
import { basePage } from '../pages/basePage';
import { HomePage } from '../pages/HomePage';
import { DomainPage } from '../pages/DomainPage';
import { AppPage } from '../pages/AppPage';
import { AdminConsole } from '../pages/AdminConsole';
import { AccessControlPage } from '../pages/AccessControlPage';


import 'dotenv/config'
import { faker } from '@faker-js/faker';


const roleName = "Create New Role -> "+faker.company.catchPhraseAdjective() +" "+faker.system.commonFileName()
const roleName2 = "Update Existing Role -> "+faker.company.catchPhraseAdjective() +" "+faker.system.commonFileName()

test.describe.serial('Create a New Role', () => {
  let page;


  test.beforeAll(async ({ browser, request }) => {
    const context = await browser.newContext();
    // const cookies =[
    // { name: 'example_cookie_1', value: 'value_1', domain: 'example.com' }
    // ]    
    page = await context.newPage();
    const lp = new LoginPage(page);
    const nb = new NavBar(page);
    const ac = new AdminConsole(page);
    const bp = new basePage(page);
    const acp = new AccessControlPage(page);

    await lp.navigate(process.env.STAGING);
    await lp.login(process.env.OWNERUN, process.env.OWNERPW)
    await nb.goToAdminConsole()
    // console.log(await page.context().cookies());
    await bp.clickElementWithText(ac.adminConsoleModules,"Access Control")
  
    const domainPrivilegeModule = [
        acp.modulesRead
    ]
    const appPrivilegeModule = [
        acp.modulesRead,
        acp.modulesCreate
    ]
    const domainVisibility = [
      acp.domainCheckbox
    ]

    const privacyPrivileges1 = [
      acp.modulesRead
      
    ]

    const privacyPrivileges2 = [
      acp.modulesRead,
      acp.modulesCreate
    ]
    

    const appPrivilege = [
      acp.appVisible,
      acp.appCreate
    ]

    await acp.addRoleBtn.click();
    await acp.roleName.fill(roleName)
    await acp.clickPrivilegeCheckbox(acp.modulesName,"Domains",domainPrivilegeModule)
    await acp.clickPrivilegeCheckbox(acp.modulesName,"Applications",appPrivilegeModule)

    await bp.clickElementWithText(acp.privilegeTabs, "Domains") 
    await acp.clickPrivilegeCheckbox(acp.domainNames,"ForFilter",domainVisibility)
    await acp.clickPrivilegeCheckbox(acp.domainNames,"high-quality-images",domainVisibility)
    

    await bp.clickElementWithText(acp.privilegeTabs, "Privacies")
    await acp.clickPrivilegeCheckbox(acp.privacyName, "confidential",privacyPrivileges1)
    await acp.clickPrivilegeCheckbox(acp.privacyName, "public",privacyPrivileges2)

    
    await bp.clickElementWithText(acp.privilegeTabs, "Applications")
    await acp.clickPrivilegeCheckbox(acp.appName, "Normal Application", appPrivilege )

    await bp.clickElementWithText(acp.privilegeTabs, "Tags")
    await acp.enforcedTagInput.fill("Enforced")
    await bp.clickElementWithText(acp.tagListDropdown,"Enforced")
    await acp.submitBtnRole.click()
    await expect(acp.snackbarMsg).toHaveText("Creating role...")
    await expect(acp.snackbarMsg).toHaveText("Role successfully created")
    let url = await page.url()
    const roleID = url.match(/\d+/);
    // const response = await request.get('h'+roleID[0])
    // console.log(response.status())

  } 
  )

  test.afterAll(async () => {
    const acp = new AccessControlPage(page);
    await acp.deleteRoleBtn.click()
    await acp.deleteBtnDialog.click()
    await expect(acp.snackbarMsg).toHaveText("Deleting role...")
    await expect(acp.snackbarMsg).toHaveText("Role successfully deleted")
    await page.close();
  });

  
  test('Role with Domains Visible & not Visible', async ({ }) => {
    const bp = new basePage(page);
    const acp = new AccessControlPage(page);
    
    const domainVisibility = [
      acp.domainCheckbox
    ]

    await bp.clickElementWithText(acp.privilegeTabs, "Domains") 
    await acp.validatePrivilegeCheckbox(acp.domainNames,"ForFilter",domainVisibility, false)
    await acp.validatePrivilegeCheckbox(acp.domainNames,"high-quality-images",domainVisibility, false)
  }
  )

  test('Role with Privillege to View a Certain Privacy', async ({ }) => {
    const bp = new basePage(page);
    const acp = new AccessControlPage(page);
    
    const privacyPrivileges1 = [
      acp.modulesRead
      
    ]

    const privacyPrivileges2 = [
      acp.modulesRead,
      acp.modulesCreate
    ]
    await bp.clickElementWithText(acp.privilegeTabs, "Privacies")
    await acp.validatePrivilegeCheckbox(acp.privacyName, "confidential",privacyPrivileges1,true)
    await acp.validatePrivilegeCheckbox(acp.privacyName, "public",privacyPrivileges2,true)
  }
  )
  test('Role without Privilege to Create a Certain Privacy', async ({ }) => {
    const bp = new basePage(page);
    const acp = new AccessControlPage(page);
    
    const privacyPrivileges1 = [
      acp.modulesCreate
    ]

    await bp.clickElementWithText(acp.privilegeTabs, "Privacies")
    await acp.validatePrivilegeCheckbox(acp.privacyName, "confidential",privacyPrivileges1,false)
  }
  )

  test('Role without Privilege to View a Certain Privacy', async ({ }) => {
    const bp = new basePage(page);
    const acp = new AccessControlPage(page);
    
    const privacyPrivileges1 = [
      acp.modulesRead
    ]
    await acp.validatePrivilegeCheckbox(acp.privacyName, "standard",privacyPrivileges1,false)
  }
  )


  test('Role that has App Create privilege', async ({ }) => {
    const bp = new basePage(page);
    const acp = new AccessControlPage(page);

    const appPrivilegeModule = [
      acp.modulesRead,
      acp.modulesCreate
  ]

  await bp.clickElementWithText(acp.privilegeTabs, "Modules")
  await acp.validatePrivilegeCheckbox(acp.modulesName,"Applications",appPrivilegeModule, true)
  }
  )

  test('Role that has App both Visible & Create privilege', async ({ }) => {
    const bp = new basePage(page);
    const acp = new AccessControlPage(page);

    const appPrivilege = [
      acp.appVisible,
      acp.appCreate
    ]
    
    await bp.clickElementWithText(acp.privilegeTabs, "Applications")
    await acp.validatePrivilegeCheckbox(acp.appName, "Normal Application", appPrivilege, true )
    }
  )

  test('Role with Enforced Tag', async ({ }) => {
    const bp = new basePage(page);
    const acp = new AccessControlPage(page);

    await bp.clickElementWithText(acp.privilegeTabs, "Tags")
    const textOfEnforcedTags = await bp.getTextOfElements(acp.listOfEnforcedTags)
    expect(textOfEnforcedTags).toContain("Enforced")
    }
  )

});

test.describe.serial('Update, Copy and Delete existing role',()=>{
  let page;


  test.beforeAll(async ({ browser, request }) => {
    const context = await browser.newContext();
    page = await context.newPage();
    const lp = new LoginPage(page);
    const nb = new NavBar(page);
    const ac = new AdminConsole(page);
    const bp = new basePage(page);
    const acp = new AccessControlPage(page);

  const domainPrivilegeModule = [
      acp.modulesRead
  ]
  const appPrivilegeModule = [
      acp.modulesRead,
      acp.modulesCreate
  ]
  const privacyPrivileges2 = [
    acp.modulesRead,
    acp.modulesCreate
  ]

    await lp.navigate(process.env.STAGING);
    await lp.login(process.env.OWNERUN, process.env.OWNERPW)
    await nb.goToAdminConsole()
    await bp.clickElementWithText(ac.adminConsoleModules,"Access Control")

    await acp.addRoleBtn.click();
    await acp.roleName.fill(roleName2)
    await acp.clickPrivilegeCheckbox(acp.modulesName,"Domains",domainPrivilegeModule)
    await acp.clickPrivilegeCheckbox(acp.modulesName,"Applications",appPrivilegeModule)
    await bp.clickElementWithText(acp.privilegeTabs, "Privacies")
    await acp.clickPrivilegeCheckbox(acp.privacyName, "public", privacyPrivileges2)
    await acp.submitBtnRole.click()

    await acp.backBtnRolePage.click()
    
    await acp.searchRoleBtn.click()
    await acp.searchInputField.fill(roleName2)
    await bp.delay(1500)
    await bp.clickElementWithText(acp.roleList,roleName2)

    
  } 
  )

  test.afterAll(async () => {
    await page.close();
  });

  test('Role with Privilege to Create a Certain Privacy', async ({ }) => {
    const acp = new AccessControlPage(page)
    const bp = new basePage(page)

    //PRIVACY
    const privacyPrivileges2 = [
      acp.modulesRead,
      acp.modulesCreate
    ]
    await bp.clickElementWithText(acp.privilegeTabs, "Privacies")
    await acp.clickPrivilegeCheckbox(acp.privacyName, "standard", privacyPrivileges2)
    await acp.submitBtnRole.click() 
    await bp.delay(1500)
    await acp.validatePrivilegeCheckbox(acp.privacyName, "standard", privacyPrivileges2,true)
  }
  )
  test('Role without Privilege to Create a Certain Privacy', async ({ }) => {
    const acp = new AccessControlPage(page)
    const bp = new basePage(page)

    //PRIVACY
    const privacyPrivileges2 = [
      acp.modulesRead,
      acp.modulesCreate
    ]

    await bp.clickElementWithText(acp.privilegeTabs, "Privacies")
    await acp.clickPrivilegeCheckbox(acp.privacyName, "public", privacyPrivileges2) // public will be unchecked
    await acp.submitBtnRole.click() 
    await bp.delay(1500)
    await acp.validatePrivilegeCheckbox(acp.privacyName, "public", privacyPrivileges2,false) // public will be unchecked
  }
  )

  test('Role with Combination of Tags (Enforced, Blocked, Allowed Tags)', async ({ }) => {
    const acp = new AccessControlPage(page)
    const bp = new basePage(page)

    await bp.clickElementWithText(acp.privilegeTabs, "Tags")
    await acp.enforcedTagInput.fill("Enforced")
    await bp.clickElementWithText(acp.tagListDropdown,"Enforced")
    await acp.blockedTagInput.fill("Blocked")
    await bp.clickElementWithText(acp.tagListDropdown,"Blocked")
    await acp.allowedTagInput.fill("Allowed")
    await bp.clickElementWithText(acp.tagListDropdown,"Allowed")
    await acp.submitBtnRole.click()

    await bp.delay(5000)

    const textOfEnforcedTags = await bp.getTextOfElements(acp.listOfEnforcedTags)
    expect(textOfEnforcedTags).toContain("Enforced")

    const textofBlockedTags = await bp.getTextOfElements(acp.listOfBlockedTags)
    expect(textofBlockedTags).toContain("Blocked")

    const listOfAllowedTags = await bp.getTextOfElements(acp.listOfAllowedTags)
    expect(listOfAllowedTags).toContain("Allowed")

  }
  )
  test('Role with Asset Visibilty', async ({ }) => {
    const acp = new AccessControlPage(page)
    const bp = new basePage(page)

    await bp.clickElementWithText(acp.privilegeTabs, "Tags")
    await acp.assetVisibilityTagInput.fill("Asset Visibility")
    await bp.clickElementWithText(acp.tagListDropdown,"Asset Visibility")
    await acp.submitBtnRole.click()

    await bp.delay(5000)

    const listOfAssetVisibilityTags = await bp.getTextOfElements(acp.listOfAssetVisibilityTags)
    expect(listOfAssetVisibilityTags).toContain("Asset Visibility")

  }
  )
  test('Role that has App Visible privilege', async ({ }) => {
    const acp = new AccessControlPage(page)
    const bp = new basePage(page)

    const appPrivilege = [
      acp.appVisible,
      acp.appCreate
    ]
    await bp.clickElementWithText(acp.privilegeTabs, "Applications")
    await acp.clickPrivilegeCheckbox(acp.appName, "Normal Application", appPrivilege )
    await acp.submitBtnRole.click()
    await acp.validatePrivilegeCheckbox(acp.appName, "Normal Application", appPrivilege, true)
  }
  )

  test('Copy A Role', async ({ }) => {
  
    const acp = new AccessControlPage(page)
    const bp = new basePage(page)
    await acp.makeACopyBtn.click()
    await bp.submitBtn.click()
    }
  )
  test('Delete role (Custom)', async ({ }) => {
    const bp = new basePage(page)
    const acp = new AccessControlPage(page)
    await acp.deleteRoleBtn.click()
    await acp.deleteBtnDialog.click()
    await expect(acp.snackbarMsg).toHaveText("Deleting role...")
    await expect(acp.snackbarMsg).toHaveText("Role successfully deleted")

    await acp.searchRoleBtn.click()
    await acp.searchInputField.fill(roleName2)
    await bp.delay(1500)
    await acp.addRoleBtn.click()
    await bp.clickElementWithText(acp.roleList,roleName2)
    await acp.deleteRoleBtn.click()
    await acp.deleteBtnDialog.click()
    await expect(acp.snackbarMsg).toHaveText("Deleting role...")
    await expect(acp.snackbarMsg).toHaveText("Role successfully deleted")


    
    }
  )

  test('Delete role (Default)', async ({ }) => {
    const bp = new basePage(page)
    const acp = new AccessControlPage(page)
    
    await acp.searchRoleBtn.click()
    await acp.searchInputField.fill("DEFAULT")
    await bp.delay(1500)
    await bp.clickElementWithText(acp.roleList,"DEFAULT")
    await expect(acp.deleteRoleBtn).not.toBeVisible({timeout:5000})
    }
  )
})
import { type Locator, Page, expect } from '@playwright/test';
import { basePage } from './basePage';

export class AccessControlPage extends basePage{
        readonly searchRoleBtn:Locator
        readonly addRoleBtn:Locator
        readonly roleList:Locator
        readonly searchInputField:Locator
        readonly roleName:Locator
        readonly modulesName:Locator
        readonly modulesAll:Locator
        readonly modulesRead:Locator
        readonly modulesCreate:Locator
        readonly modulesUpdate:Locator
        readonly modulesDelete:Locator
        readonly modulesDownload:Locator
        readonly privilegeTabs:Locator
        readonly domainCheckbox:Locator
        readonly domainNames:Locator
        readonly privacyName:Locator
        readonly appCreate:Locator
        readonly appVisible:Locator
        readonly appName:Locator
        readonly enforcedTagInput:Locator
        readonly blockedTagInput:Locator
        readonly allowedTagInput:Locator
        readonly assetVisibilityTagInput:Locator
        readonly tagListDropdown:Locator
        readonly submitBtnRole:Locator
        readonly snackbarMsg:Locator
        readonly listOfEnforcedTags:Locator
        readonly listOfAllowedTags:Locator
        readonly listOfAssetVisibilityTags:Locator
        readonly listOfBlockedTags:Locator
        readonly backBtnRolePage:Locator
        readonly deleteRoleBtn:Locator
        readonly makeACopyBtn:Locator
        readonly deleteBtnDialog:Locator
        
        
    constructor(public page: Page) {
        super(page)
        this.page = page;
        this.addRoleBtn = page.locator('((//div[@data-testid="RolesPage"]) [1] //button) [3]')
        this.searchRoleBtn = page.locator('((//div[@data-testid="RolesPage"]) [1] //button) [1]')
        this.searchInputField = page.locator('((//div[@data-testid="RolesPage"]) [1] //input)')
        this.roleList = page.locator('//div[@data-testid="CardItem"]//div[@data-testid="RolesPage"]/div')
        this.backBtnRolePage = page.locator('(//div[@data-testid="PageHeader"]//button)[1]')
        this.makeACopyBtn = page.locator('(//div[@data-testid="PageHeader"]//button)[5]')
        this.deleteRoleBtn = page.locator('(//div[@data-testid="PageHeader"]//button)[4]')
        this.roleName = page.locator('[name="roleName"]')
        this.privilegeTabs = page.locator('[data-testid="DialogTabs"] [data-testid="renderTabs"]')

        this.modulesName = page.locator('(//tbody/tr)/td[1]/span')
        this.modulesAll = page.locator('(//tbody/tr)/td[2]//input')
        this.modulesRead = page.locator('(//tbody/tr)/td[3]//input')
        this.modulesCreate = page.locator('(//tbody/tr)/td[4]//input')
        this.modulesUpdate = page.locator('(//tbody/tr)/td[5]//input')
        this.modulesDelete = page.locator('(//tbody/tr)/td[6]//input')
        this.modulesDownload = page.locator('(//tbody/tr)/td[7]//input')

        this.domainNames = page.locator('tbody tr td div')
        this.domainCheckbox = page.locator("[type='checkbox']")
        this.privacyName = page.locator('//div[@data-testid="PrivacyItem"]/p[1]')

        this.appName = page.locator('(//tbody/tr)/td[1]/span')
        this.appVisible = page.locator('(//tbody/tr)/td[2]//input')
        this.appCreate = page.locator('(//tbody/tr)/td[3]//input')


        this.enforcedTagInput = page.locator('(//div[@tags="List []"] //input)[1]')
        this.blockedTagInput = page.locator('(//div[@tags="List []"] //input)[2]')
        this.allowedTagInput = page.locator('(//div[@tags="List []"] //input)[3]')
        this.assetVisibilityTagInput = page.locator('(//div[@tags="List []"] //input)[4]')
        this.tagListDropdown = page.locator("//li[@data-testid='AutocompleteTags']/span")
        
        this.submitBtnRole = page.locator('[data-testid="getActions"] button')

        this.snackbarMsg = page.locator('#message-id')

        this.listOfEnforcedTags = page.locator("((//div[@data-testid='RoleTags'])[2])//span/div/span")
        this.listOfBlockedTags = page.locator("((//div[@data-testid='RoleTags'])[3])//span/div/span")
        this.listOfAllowedTags = page.locator("((//div[@data-testid='RoleTags'])[4])//span/div/span")
        this.listOfAssetVisibilityTags = page.locator("((//div[@data-testid='RoleTags'])[5])//span/div/span")
        
        this.deleteBtnDialog = page.locator("//div[@role='dialog']//button[2]")
    }


}
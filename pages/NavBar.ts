import { expect, Page, type Locator } from '@playwright/test';
import { basePage } from './basePage';

export class NavBar extends basePage{

    constructor(public page: Page) {
        super(page)
        this.page = page;
    }

    async logout() {
        await this.page.getByTestId("UserAvatar").click();
        await this.page.click("//li[@role='menuitem'] [1]");
        
    }

    async goToAdminConsole(){
        await this.page.getByTestId("UserAvatar").click();
        await this.page.click('[href="/admin"]');
    }
    async clickLogo() {
        await this.page.locator("[data-testid='AppLogo']").click()
    }

    async fillSearchBar(Query,TargetDomainOrApp) {
        await this.page.locator("//input[@type='text']").fill(Query)
        await this.clickElementWithText(this.page.locator("((//div[@data-testid='SearchDropdown'])/div)/div[2]/p"),TargetDomainOrApp)
    }
}
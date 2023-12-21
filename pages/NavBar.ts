import { Page } from '@playwright/test';

export class NavBar {

    constructor(public page: Page) {
        this.page = page;
    }

    async logout() {
        await this.page.getByTestId("UserAvatar").click();
        await this.page.click("//li[@role='menuitem'] [1]");
        
    }
    async clickLogo() {
        await this.page.locator("[data-testid='AppLogo']").click()
    }


}
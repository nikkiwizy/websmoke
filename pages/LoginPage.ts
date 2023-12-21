import { Page, type Locator ,expect } from '@playwright/test';
export class LoginPage {
    readonly arrived : Locator;
    readonly unregisteredGMAIL : Locator;
    readonly helperLogin : Locator;

    constructor(public page: Page) {
        this.page = page;
        this.arrived = page.getByTestId('TextDivider');
        this.unregisteredGMAIL = page.locator("//div[@data-email='wizytester1unregistered@gmail.com']");
        this.helperLogin = page.locator('#formPassword-helper-text');
    }


    async navigate(url) {
                await this.page.goto(url);
    }
    async login(username, password) {
        await this.page.fill('#formEmail', username);
        await this.page.fill('#formPassword', password);
        await this.page.click('button[type="submit"]');
    }

    async googleLogin(email, password) {
        await this.page.getByTestId('GoogleButton').click();
        await this.page.fill("input[type='email']", email);
        await this.page.click("[id='identifierNext'] button");
        await expect(this.page.locator("input[type='password']")).toBeEmpty({timeout:10000});
        await this.page.fill("input[type='password']", password);
        await this.page.click("[id='passwordNext'] button");
    }

    async appleLogin(email, password) {
        await this.page.getByTestId('GoogleButton').click();
        await this.page.fill("input[type='email']", email);
        await this.page.click("[id='identifierNext'] button");
        await expect(this.page.locator("input[type='password']")).toBeEmpty({timeout:10000});
        await this.page.fill("input[type='password']", password);
        await this.page.click("[id='passwordNext'] button");
    }

    async verifyIncorrectCredentialsMsg(){
        await expect(this.helperLogin).toContainText('Invalid username or password.', { timeout: 40000 });
    }
    async verifyLandingOnLoginPage(){
        await expect(this.arrived).toBeVisible({ timeout: 40000 });
    }
    async verifyUnregisteredLogin(email){
        await expect(this.unregisteredGMAIL).toContainText(email,{ timeout: 40000 });
    }


}
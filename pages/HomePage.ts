import { Locator, Page } from '@playwright/test';

export class HomePage {
    readonly apptext:Locator
    readonly dactext:Locator

    constructor(public page: Page) {
        this.page = page;
        this.apptext= page.locator("((//div[@data-testid='CardsWidget'])[1]) //h6[@data-testid='Truncated']");
        this.dactext= page.locator("((//div[@data-testid='CardsWidget'])[2]) //h6[@data-testid='Truncated']");
    }

}
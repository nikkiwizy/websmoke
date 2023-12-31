import { type Locator, Page, expect } from '@playwright/test';
import { basePage } from './basePage';

export class AdminConsole{
    readonly adminConsoleModules: Locator

    constructor(public page: Page) {
        // super(page)
        this.page = page;
        this.adminConsoleModules = page.locator('[data-testid="Item"] div span')
    }

}
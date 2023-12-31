import { Page, type Locator } from '@playwright/test';
import { basePage } from './basePage';

export class AppPage extends basePage{
    readonly caseNumbersInCaselist: Locator;
    readonly caseNumberCaseView:Locator
    readonly appNameCaseView:Locator
    readonly casesInAddToCaselist:Locator

    constructor(public page: Page) {
        super(page)
        this.page = page;
        this.casesInAddToCaselist = page.locator("(//tr[@role='checkbox'])");
        this.caseNumbersInCaselist = page.locator("[data-testid='LinkComp']");
        this.caseNumberCaseView = page.locator('(//div[@data-testid="PostViewHeaderLayout"] //h6)[1]')
        this.appNameCaseView = page.locator('(//div[@data-testid="PostViewHeaderLayout"] //h6)[2]')
        
   
    }

}
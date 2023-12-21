import { type Locator, Page, expect } from '@playwright/test';
import { basePage } from './basePage';

export class DomainPage extends basePage{
    readonly uploadBTN:Locator
    readonly inputFile:Locator
    readonly fileSubmit:Locator
    readonly uploadDialogFileNames:Locator
    readonly filesSorterBtn:Locator
    readonly latestUpload:Locator
    readonly filesInFileList:Locator
    readonly uploadDialog:Locator
    readonly cancelBtn:Locator
    readonly submitBtn:Locator
    readonly checkBoxPerFile:Locator
    readonly tooltipText:Locator
    readonly createCaseFromHeader:Locator
    readonly applist:Locator
    readonly createCaseBtnFileView:Locator
    readonly fileName:Locator
    
    constructor(public page: Page) {
        super(page)
        this.page = page;
        this.uploadBTN= page.locator("//span[@data-testid='Header']/button");
        this.inputFile= page.locator("(//input[@type='file'])[1]");
        this.fileSubmit= page.getByTestId("ButtonSubmit");
        this.uploadDialogFileNames= page.locator("[data-testid='Attachment'] [data-testid='Text']");
        this.filesSorterBtn= page.locator("//div[@data-testid='SectionHeader'] //div[@aria-haspopup='listbox']");
        this.latestUpload= page.locator("[data-value='last-upload']");
        this.uploadDialog= page.locator("//div[@role='dialog'][1]");
        this.submitBtn= page.getByTestId("ButtonSubmit");
        this.cancelBtn= page.getByTestId("ButtonCancel");
        this.checkBoxPerFile= page.locator("//div[@data-testid='Row']/div //span[@data-testid='Checkbox']");
        this.tooltipText= page.locator("//div[@role='tooltip']/div");
        this.filesInFileList= page.getByTestId("SelectableThumbnail")
        this.createCaseFromHeader= page.locator("(//div[@data-testid='SectionHeader']//button)[5]")
        this.applist = page.locator("[role='dialog'] h6")
        this.createCaseBtnFileView = page.getByTestId('CreateCaseButton')
        this.fileName = page.locator('//h6[@data-testid="Subtitle1"]/span')
    }

    async createCaseFromDAC(locator,ApplicationName){
      await locator.click();
      await this.delay(3500)
      console.log(ApplicationName)
      await this.clickElementWithText(this.applist, ApplicationName)
    }

    

    async backToHome(){
        await expect(this.page.locator("((//div[contains(@role,'dialog')])[2])//button[2]")).toBeVisible({timeout:120000})
        await this.page.locator("((//div[contains(@role,'dialog')])[2])//button[2]").click();
    }

    async hoverAndMultiSelect(count,elementsToHover,checkBox){
        await expect(elementsToHover.first()).toBeVisible({ timeout: 50000 });
        await this.delay(1500)
          for (let i = 0; i < count; i++) {
              await checkBox.nth(i).click();
              await this.delay(250)
         }
      }

    async uploadFile(locator,numberOfFiles,dirOfFiles,locatorForValidation){
        await this.uploadBTN.click();
        await this.uploadRandomFile(locator,numberOfFiles,dirOfFiles);
        const arrays = await this.getTextOfElements(locatorForValidation);
        await expect(this.fileSubmit).toBeEnabled({timeout:30000*numberOfFiles}).then(async () => {await this.fileSubmit.click();});
        return arrays
    }
    async uploadViaCapture(locatorForValidation){
        await this.uploadBTN.click();
        await this.capturePhoto();
        const arrays = await this.getTextOfElements(locatorForValidation);
        await expect(this.fileSubmit).toBeEnabled({timeout:30000}).then(async () => {await this.fileSubmit.click();});
        return arrays
    }

    async switchToLatestUpload(){
        await this.filesSorterBtn.click();
        await this.latestUpload.click();
    }

    async capturePhoto(){
       await this.page.locator("(//div[@role='dialog'] //div[@data-testid='render'] //button)[2]").click();
       await this.delay(2500)
       await this.page.locator("[aria-label='Capture']").click();
       await this.page.locator("(//div[@role='dialog'] //button[@type='button'])[9]").click();
    }


}
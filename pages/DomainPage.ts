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
    readonly deleteFileFromHeader:Locator
    readonly updateTagsFromHeader:Locator
    readonly createCaseFromHeader:Locator
    readonly applist:Locator
    readonly createCaseBtnFileView:Locator
    readonly fileNameInFileView:Locator
    readonly backBtnFileView:Locator
    readonly fileDetailsSections:Locator
    readonly createCaseInFileDetails:Locator
    readonly addToCaseInFileDetails:Locator
    readonly caseListInAppsFileDetails:Locator
    readonly deleteFileBtnFileView:Locator
    readonly emptyView:Locator
    readonly enterpriseTagsFileDetails:Locator
    readonly freeTagsFromDialog:Locator
    readonly enterpriseTagsFromDialog:Locator
    readonly tagTextFromDialogDropDown:Locator
    readonly addTagBtnFromHeader:Locator
    readonly prevBtnFileView:Locator
    readonly nextBtnFileView:Locator
    readonly privacyBtnFileView:Locator
    readonly privacyDropdownFileView:Locator
    readonly privacyFilter:Locator
    readonly typeFilter:Locator
    readonly filterPrivacyTypeQuality:Locator
    readonly qualityFilter:Locator
    readonly uploaderFilter:Locator
    readonly refreshBtn:Locator
    readonly resetBtn:Locator
    readonly headerButtons:Locator
    readonly tagsNames:Locator
    readonly inputCheckBoxTags:Locator
    readonly dialogFilterUploader:Locator
    readonly tagsNamesDomain:Locator
    readonly inputCheckBoxTagsDomain:Locator
    readonly resetTagsBtn:Locator
    readonly mapFilter:Locator
    
    
    constructor(public page: Page) {
        super(page)
        this.page = page;

        // Uploading File
        this.uploadBTN= page.locator("//span[@data-testid='Header']/button");
        this.inputFile= page.locator("(//input[@type='file'])[1]");
        this.fileSubmit= page.getByTestId("ButtonSubmit");
        this.uploadDialogFileNames= page.locator("[data-testid='Attachment'] [data-testid='Text']");
        this.filesSorterBtn= page.locator("//div[@data-testid='SectionHeader'] //div[@aria-haspopup='listbox']");
        this.latestUpload= page.locator("[data-value='last-upload']");
        this.mapFilter= page.locator("[data-value='map']");
        this.uploadDialog= page.locator("//div[@role='dialog'][1]");
        this.submitBtn= page.getByTestId("ButtonSubmit");
        this.cancelBtn= page.getByTestId("ButtonCancel");
        
        // File List
        this.freeTagsFromDialog= page.locator("[name='freeTags'] input[type='text']");
        this.enterpriseTagsFromDialog= page.locator("[name='tags'] input[type='text']");
        this.tagTextFromDialogDropDown=page.locator('[data-testid="AutocompleteTags"] span')
        this.checkBoxPerFile= page.locator("//div[@data-testid='Row']/div //span[@data-testid='Checkbox']");
        this.tooltipText= page.locator("//div[@role='tooltip']/div");
        this.filesInFileList= page.getByTestId("SelectableThumbnail")
        this.updateTagsFromHeader= page.locator("(//div[@data-testid='SectionHeader']//button)[2]")
        this.createCaseFromHeader= page.locator("(//div[@data-testid='SectionHeader']//button)[5]")
        this.addTagBtnFromHeader= page.locator('(//nav[@aria-label="apps"]//div[@data-testid="ListItem"] )[1]')
        this.deleteFileFromHeader= page.locator("(//div[@data-testid='SectionHeader']//button)[6]")
        this.applist = page.locator("[role='dialog'] h6")
        this.emptyView = page.getByTestId('TextBold')
        this.privacyFilter = page.locator('(//div[@data-testid="Filter"] //button) [1]')
        this.typeFilter = page.locator('(//div[@data-testid="Filter"] //button) [2]')
        this.qualityFilter = page.locator('(//div[@data-testid="Filter"] //button) [3]')
        this.uploaderFilter = page.locator('(//div[@data-testid="Filter"] //button) [4]')
        
        this.dialogFilterUploader = page.locator('[data-testid="FilterUsers"] [data-testid="ListItem"] [data-testid="Truncated"]')
        this.filterPrivacyTypeQuality = page.locator('[data-testid="FilterContainer"] [data-testid="ListItem"] [data-testid="Truncated"]')
        this.refreshBtn = page.locator('[aria-label="Refresh"]')
        this.headerButtons = page.locator('//div[@data-testid="SectionHeader"]//button')

        this.inputCheckBoxTags = page.locator('[data-testid="ListTags"] span[data-testid="Checkbox"]')
        this.tagsNames = page.locator('[data-testid="ListTags"] [data-testid="Truncated"]')
        this.tagsNamesDomain = page.locator('(//ul[@data-testid="LabelList"]) /div //li[@data-testid="ListItem"] //div/span/div')
        this.inputCheckBoxTagsDomain = page.locator('(//ul[@data-testid="LabelList"]) /div //li[@data-testid="ListItem"] //span[@data-testid="Checkbox"]')
        this.resetTagsBtn = page.locator('//div[@data-testid="HomeSidebar"] //div[@data-testid="Section"] //button[contains(text(),"Reset Selected Tags")]')
        
        //File View
        this.createCaseBtnFileView = page.getByTestId('CreateCaseButton')
        this.deleteFileBtnFileView = page.locator("button[aria-label='Delete']")
        this.fileNameInFileView = page.locator('//h6[@data-testid="Subtitle1"]/span')
        this.backBtnFileView = page.locator('[data-testid="ArrowBackIcon"]')
        this.fileDetailsSections = page.locator('//ul[@data-testid="Section"]/div/div/h6')
        this.createCaseInFileDetails = page.locator('(((//div[@data-testid="SectionItem"])[3])//button)[2]')
        this.addToCaseInFileDetails = page.locator('(((//div[@data-testid="SectionItem"])[3])//button)[1]')
        this.caseListInAppsFileDetails = page.locator('((//div[@data-testid="SectionItem"])[3])//a/div')
        this.enterpriseTagsFileDetails = page.locator('(//div[@data-testid="SectionItem"][1])//div[@data-testid="Label"]')
        this.nextBtnFileView = page.getByTestId("FloatingNavButtons").last()
        this.prevBtnFileView = page.getByTestId("FloatingNavButtons").first()
        this.privacyBtnFileView = page.locator('((//div[@data-testid="SectionItem"])[3])//span')
        this.privacyDropdownFileView = page.locator('[data-testid="Truncated"]')

        

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
        await expect(this.filesSorterBtn).toBeEnabled({timeout:15000});
        await this.filesSorterBtn.click();
        await this.latestUpload.click();
    }
    async switchToMapView(){
        await expect(this.filesSorterBtn).toBeEnabled({timeout:15000});
        await this.filesSorterBtn.click();
        await this.mapFilter.click();
    }

    
    async capturePhoto(){
       await this.page.locator("(//div[@role='dialog'] //div[@data-testid='render'] //button)[2]").click();
       await this.delay(2500)
       await this.page.locator("[aria-label='Capture']").click();
       await this.page.locator("(//div[@role='dialog'] //button[@type='button'])[9]").click();
    }

}
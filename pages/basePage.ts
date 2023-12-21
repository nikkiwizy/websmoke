import { Locator, Page, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { faker } from '@faker-js/faker';


export class basePage{
  
    readonly apptext:Locator
    readonly dactext:Locator
    readonly cancelBtn:Locator
    readonly submitBtn:Locator
    readonly caseNumberCaseView:Locator
    readonly appNameCaseView:Locator
    
    constructor(public page: Page) {
        this.page = page;
        this.submitBtn= page.getByTestId("ButtonSubmit");
        this.cancelBtn= page.getByTestId("ButtonCancel");
        this.caseNumberCaseView = page.locator('(//div[@data-testid="PostViewHeaderLayout"] //h6)[1]')
        this.appNameCaseView = page.locator('(//div[@data-testid="PostViewHeaderLayout"] //h6)[2]')
    }

    async delay(secs){
      const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
      await delay(secs);
    }

    async getTextOfElements(elements){
        const array: string[] = [];
        const count = await elements.count();
        for (let i = 0; i < count; i++) {
            let text = await elements.nth(i).innerText();
            console.log(text)
            array.push(text)
       }
       return array
    }
    async clickSubmitBtn(){
      await expect(this.submitBtn).toBeEnabled({timeout:15000})
      await this.submitBtn.click();
      
  }

  async clickAndGetCaseNumberSnackBar(){
      const getCaseNumber = await this.page.locator("//div[@role='alert']/div/button").innerText()
      await this.page.locator("//div[@role='alert']/div/button").click()
      return getCaseNumber
  }
    
    

    async hoverAndGetTooltipText(count,elementsToHover,elementsToRetrieveText){
    await expect(elementsToHover.first()).toBeVisible({ timeout: 50000 });
    await this.delay(2500)
      const array: string[] = [];
      for (let i = 0; i < count; i++) {
          await elementsToHover.nth(i).hover();
          await this.delay(750)
          let text = await elementsToRetrieveText.innerText();
          console.log(text)
          array.push(text)
     }
     return array
  }

      async clickElementWithText(elements,desiredText){
        await expect(elements.first()).toBeVisible({ timeout: 50000 });
        const count = await elements.count();
        for (let i = 0; i < count; i++) {
            let text = await elements.nth(i).innerText();
            if (text === desiredText) {
            await elements.nth(i).click();
            break;
          }
       }
    }


async uploadRandomFile(locator,numberOfFiles,dirOfFiles): Promise<void> {
    const directoryPath = dirOfFiles;
    let i = 0;
    while(i<numberOfFiles){
    try {
    const files = fs.readdirSync(directoryPath);
    if (files.length === 0) {
      console.error('No files found in the directory.');
      return;
    }
    let num = faker.number.float({min:0, max:100000, precision: 0.001}).toString();
    const randomIndex = Math.floor(Math.random() * files.length);
    const randomFile = files[randomIndex];
    const filePath = path.join(directoryPath, randomFile);
    // Set input files for the element
    await locator.setInputFiles(filePath);
    // Rename the chosen file using faker.js
    const randomFileName = faker.system.commonFileName('jpg');
    const newFilePath = path.join(directoryPath,num+'---'+randomFileName);
    fs.renameSync(filePath, newFilePath);

    console.log(`File uploaded and renamed to: ${newFilePath}`);
  } catch (error) {
    console.error('Error uploading and renaming file:', error.message);
  }
  i++
}

}

}

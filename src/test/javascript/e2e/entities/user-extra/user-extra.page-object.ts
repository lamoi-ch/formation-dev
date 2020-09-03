import { element, by, ElementFinder } from 'protractor';

export class UserExtraComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-user-extra div table .btn-danger'));
  title = element.all(by.css('jhi-user-extra div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class UserExtraUpdatePage {
  pageTitle = element(by.id('jhi-user-extra-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));

  userCategorySelect = element(by.id('field_userCategory'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async userCategorySelectLastOption(): Promise<void> {
    await this.userCategorySelect.all(by.tagName('option')).last().click();
  }

  async userCategorySelectOption(option: string): Promise<void> {
    await this.userCategorySelect.sendKeys(option);
  }

  getUserCategorySelect(): ElementFinder {
    return this.userCategorySelect;
  }

  async getUserCategorySelectedOption(): Promise<string> {
    return await this.userCategorySelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class UserExtraDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-userExtra-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-userExtra'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}

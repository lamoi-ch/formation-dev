import { element, by, ElementFinder } from 'protractor';

export class Document1ComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-document-1 div table .btn-danger'));
  title = element.all(by.css('jhi-document-1 div h2#page-heading span')).first();
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

export class Document1UpdatePage {
  pageTitle = element(by.id('jhi-document-1-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));

  documentCategoriesSelect = element(by.id('field_documentCategories'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async documentCategoriesSelectLastOption(): Promise<void> {
    await this.documentCategoriesSelect.all(by.tagName('option')).last().click();
  }

  async documentCategoriesSelectOption(option: string): Promise<void> {
    await this.documentCategoriesSelect.sendKeys(option);
  }

  getDocumentCategoriesSelect(): ElementFinder {
    return this.documentCategoriesSelect;
  }

  async getDocumentCategoriesSelectedOption(): Promise<string> {
    return await this.documentCategoriesSelect.element(by.css('option:checked')).getText();
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

export class Document1DeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-document1-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-document1'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}

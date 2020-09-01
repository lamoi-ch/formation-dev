import { element, by, ElementFinder } from 'protractor';

export class FormationTypeComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-formation-type div table .btn-danger'));
  title = element.all(by.css('jhi-formation-type div h2#page-heading span')).first();
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

export class FormationTypeUpdatePage {
  pageTitle = element(by.id('jhi-formation-type-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  descriptionInput = element(by.id('field_description'));
  durationInput = element(by.id('field_duration'));

  documentTypeSelect = element(by.id('field_documentType'));
  documentsSelect = element(by.id('field_documents'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setDescriptionInput(description: string): Promise<void> {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput(): Promise<string> {
    return await this.descriptionInput.getAttribute('value');
  }

  async setDurationInput(duration: string): Promise<void> {
    await this.durationInput.sendKeys(duration);
  }

  async getDurationInput(): Promise<string> {
    return await this.durationInput.getAttribute('value');
  }

  async documentTypeSelectLastOption(): Promise<void> {
    await this.documentTypeSelect.all(by.tagName('option')).last().click();
  }

  async documentTypeSelectOption(option: string): Promise<void> {
    await this.documentTypeSelect.sendKeys(option);
  }

  getDocumentTypeSelect(): ElementFinder {
    return this.documentTypeSelect;
  }

  async getDocumentTypeSelectedOption(): Promise<string> {
    return await this.documentTypeSelect.element(by.css('option:checked')).getText();
  }

  async documentsSelectLastOption(): Promise<void> {
    await this.documentsSelect.all(by.tagName('option')).last().click();
  }

  async documentsSelectOption(option: string): Promise<void> {
    await this.documentsSelect.sendKeys(option);
  }

  getDocumentsSelect(): ElementFinder {
    return this.documentsSelect;
  }

  async getDocumentsSelectedOption(): Promise<string> {
    return await this.documentsSelect.element(by.css('option:checked')).getText();
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

export class FormationTypeDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-formationType-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-formationType'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}

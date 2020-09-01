import { element, by, ElementFinder } from 'protractor';

export class DocumentComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-document div table .btn-danger'));
  title = element.all(by.css('jhi-document div h2#page-heading span')).first();
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

export class DocumentUpdatePage {
  pageTitle = element(by.id('jhi-document-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));
  descriptionInput = element(by.id('field_description'));
  urlInput = element(by.id('field_url'));
  durationInput = element(by.id('field_duration'));
  creationDateInput = element(by.id('field_creationDate'));
  userCreationInput = element(by.id('field_userCreation'));
  downloadDateInput = element(by.id('field_downloadDate'));
  userDownloadInput = element(by.id('field_userDownload'));

  documentCategorySelect = element(by.id('field_documentCategory'));
  documentTypeSelect = element(by.id('field_documentType'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setDescriptionInput(description: string): Promise<void> {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput(): Promise<string> {
    return await this.descriptionInput.getAttribute('value');
  }

  async setUrlInput(url: string): Promise<void> {
    await this.urlInput.sendKeys(url);
  }

  async getUrlInput(): Promise<string> {
    return await this.urlInput.getAttribute('value');
  }

  async setDurationInput(duration: string): Promise<void> {
    await this.durationInput.sendKeys(duration);
  }

  async getDurationInput(): Promise<string> {
    return await this.durationInput.getAttribute('value');
  }

  async setCreationDateInput(creationDate: string): Promise<void> {
    await this.creationDateInput.sendKeys(creationDate);
  }

  async getCreationDateInput(): Promise<string> {
    return await this.creationDateInput.getAttribute('value');
  }

  async setUserCreationInput(userCreation: string): Promise<void> {
    await this.userCreationInput.sendKeys(userCreation);
  }

  async getUserCreationInput(): Promise<string> {
    return await this.userCreationInput.getAttribute('value');
  }

  async setDownloadDateInput(downloadDate: string): Promise<void> {
    await this.downloadDateInput.sendKeys(downloadDate);
  }

  async getDownloadDateInput(): Promise<string> {
    return await this.downloadDateInput.getAttribute('value');
  }

  async setUserDownloadInput(userDownload: string): Promise<void> {
    await this.userDownloadInput.sendKeys(userDownload);
  }

  async getUserDownloadInput(): Promise<string> {
    return await this.userDownloadInput.getAttribute('value');
  }

  async documentCategorySelectLastOption(): Promise<void> {
    await this.documentCategorySelect.all(by.tagName('option')).last().click();
  }

  async documentCategorySelectOption(option: string): Promise<void> {
    await this.documentCategorySelect.sendKeys(option);
  }

  getDocumentCategorySelect(): ElementFinder {
    return this.documentCategorySelect;
  }

  async getDocumentCategorySelectedOption(): Promise<string> {
    return await this.documentCategorySelect.element(by.css('option:checked')).getText();
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

export class DocumentDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-document-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-document'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}

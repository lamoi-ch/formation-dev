import { element, by, ElementFinder } from 'protractor';

export class FormationModuleComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-formation-module div table .btn-danger'));
  title = element.all(by.css('jhi-formation-module div h2#page-heading span')).first();
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

export class FormationModuleUpdatePage {
  pageTitle = element(by.id('jhi-formation-module-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  codeInput = element(by.id('field_code'));
  nameInput = element(by.id('field_name'));
  descriptionInput = element(by.id('field_description'));

  formationTypesSelect = element(by.id('field_formationTypes'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCodeInput(code: string): Promise<void> {
    await this.codeInput.sendKeys(code);
  }

  async getCodeInput(): Promise<string> {
    return await this.codeInput.getAttribute('value');
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

  async formationTypesSelectLastOption(): Promise<void> {
    await this.formationTypesSelect.all(by.tagName('option')).last().click();
  }

  async formationTypesSelectOption(option: string): Promise<void> {
    await this.formationTypesSelect.sendKeys(option);
  }

  getFormationTypesSelect(): ElementFinder {
    return this.formationTypesSelect;
  }

  async getFormationTypesSelectedOption(): Promise<string> {
    return await this.formationTypesSelect.element(by.css('option:checked')).getText();
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

export class FormationModuleDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-formationModule-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-formationModule'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}

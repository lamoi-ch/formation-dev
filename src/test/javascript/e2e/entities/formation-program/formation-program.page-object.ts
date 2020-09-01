import { element, by, ElementFinder } from 'protractor';

export class FormationProgramComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-formation-program div table .btn-danger'));
  title = element.all(by.css('jhi-formation-program div h2#page-heading span')).first();
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

export class FormationProgramUpdatePage {
  pageTitle = element(by.id('jhi-formation-program-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));
  descriptionInput = element(by.id('field_description'));

  userCategoriesSelect = element(by.id('field_userCategories'));
  programTypeSelect = element(by.id('field_programType'));
  profileVariantSelect = element(by.id('field_profileVariant'));
  formationModulesSelect = element(by.id('field_formationModules'));

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

  async userCategoriesSelectLastOption(): Promise<void> {
    await this.userCategoriesSelect.all(by.tagName('option')).last().click();
  }

  async userCategoriesSelectOption(option: string): Promise<void> {
    await this.userCategoriesSelect.sendKeys(option);
  }

  getUserCategoriesSelect(): ElementFinder {
    return this.userCategoriesSelect;
  }

  async getUserCategoriesSelectedOption(): Promise<string> {
    return await this.userCategoriesSelect.element(by.css('option:checked')).getText();
  }

  async programTypeSelectLastOption(): Promise<void> {
    await this.programTypeSelect.all(by.tagName('option')).last().click();
  }

  async programTypeSelectOption(option: string): Promise<void> {
    await this.programTypeSelect.sendKeys(option);
  }

  getProgramTypeSelect(): ElementFinder {
    return this.programTypeSelect;
  }

  async getProgramTypeSelectedOption(): Promise<string> {
    return await this.programTypeSelect.element(by.css('option:checked')).getText();
  }

  async profileVariantSelectLastOption(): Promise<void> {
    await this.profileVariantSelect.all(by.tagName('option')).last().click();
  }

  async profileVariantSelectOption(option: string): Promise<void> {
    await this.profileVariantSelect.sendKeys(option);
  }

  getProfileVariantSelect(): ElementFinder {
    return this.profileVariantSelect;
  }

  async getProfileVariantSelectedOption(): Promise<string> {
    return await this.profileVariantSelect.element(by.css('option:checked')).getText();
  }

  async formationModulesSelectLastOption(): Promise<void> {
    await this.formationModulesSelect.all(by.tagName('option')).last().click();
  }

  async formationModulesSelectOption(option: string): Promise<void> {
    await this.formationModulesSelect.sendKeys(option);
  }

  getFormationModulesSelect(): ElementFinder {
    return this.formationModulesSelect;
  }

  async getFormationModulesSelectedOption(): Promise<string> {
    return await this.formationModulesSelect.element(by.css('option:checked')).getText();
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

export class FormationProgramDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-formationProgram-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-formationProgram'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}

import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { FormationModuleComponentsPage, FormationModuleDeleteDialog, FormationModuleUpdatePage } from './formation-module.page-object';

const expect = chai.expect;

describe('FormationModule e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let formationModuleComponentsPage: FormationModuleComponentsPage;
  let formationModuleUpdatePage: FormationModuleUpdatePage;
  let formationModuleDeleteDialog: FormationModuleDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load FormationModules', async () => {
    await navBarPage.goToEntity('formation-module');
    formationModuleComponentsPage = new FormationModuleComponentsPage();
    await browser.wait(ec.visibilityOf(formationModuleComponentsPage.title), 5000);
    expect(await formationModuleComponentsPage.getTitle()).to.eq('komportementalistApp.formationModule.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(formationModuleComponentsPage.entities), ec.visibilityOf(formationModuleComponentsPage.noResult)),
      1000
    );
  });

  it('should load create FormationModule page', async () => {
    await formationModuleComponentsPage.clickOnCreateButton();
    formationModuleUpdatePage = new FormationModuleUpdatePage();
    expect(await formationModuleUpdatePage.getPageTitle()).to.eq('komportementalistApp.formationModule.home.createOrEditLabel');
    await formationModuleUpdatePage.cancel();
  });

  it('should create and save FormationModules', async () => {
    const nbButtonsBeforeCreate = await formationModuleComponentsPage.countDeleteButtons();

    await formationModuleComponentsPage.clickOnCreateButton();

    await promise.all([
      formationModuleUpdatePage.setCodeInput('code'),
      formationModuleUpdatePage.setNameInput('name'),
      formationModuleUpdatePage.setDescriptionInput('description'),
      // formationModuleUpdatePage.formationTypesSelectLastOption(),
    ]);

    expect(await formationModuleUpdatePage.getCodeInput()).to.eq('code', 'Expected Code value to be equals to code');
    expect(await formationModuleUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await formationModuleUpdatePage.getDescriptionInput()).to.eq(
      'description',
      'Expected Description value to be equals to description'
    );

    await formationModuleUpdatePage.save();
    expect(await formationModuleUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await formationModuleComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last FormationModule', async () => {
    const nbButtonsBeforeDelete = await formationModuleComponentsPage.countDeleteButtons();
    await formationModuleComponentsPage.clickOnLastDeleteButton();

    formationModuleDeleteDialog = new FormationModuleDeleteDialog();
    expect(await formationModuleDeleteDialog.getDialogTitle()).to.eq('komportementalistApp.formationModule.delete.question');
    await formationModuleDeleteDialog.clickOnConfirmButton();

    expect(await formationModuleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

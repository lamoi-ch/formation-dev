import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { FormationTypeComponentsPage, FormationTypeDeleteDialog, FormationTypeUpdatePage } from './formation-type.page-object';

const expect = chai.expect;

describe('FormationType e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let formationTypeComponentsPage: FormationTypeComponentsPage;
  let formationTypeUpdatePage: FormationTypeUpdatePage;
  let formationTypeDeleteDialog: FormationTypeDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load FormationTypes', async () => {
    await navBarPage.goToEntity('formation-type');
    formationTypeComponentsPage = new FormationTypeComponentsPage();
    await browser.wait(ec.visibilityOf(formationTypeComponentsPage.title), 5000);
    expect(await formationTypeComponentsPage.getTitle()).to.eq('komportementalistApp.formationType.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(formationTypeComponentsPage.entities), ec.visibilityOf(formationTypeComponentsPage.noResult)),
      1000
    );
  });

  it('should load create FormationType page', async () => {
    await formationTypeComponentsPage.clickOnCreateButton();
    formationTypeUpdatePage = new FormationTypeUpdatePage();
    expect(await formationTypeUpdatePage.getPageTitle()).to.eq('komportementalistApp.formationType.home.createOrEditLabel');
    await formationTypeUpdatePage.cancel();
  });

  it('should create and save FormationTypes', async () => {
    const nbButtonsBeforeCreate = await formationTypeComponentsPage.countDeleteButtons();

    await formationTypeComponentsPage.clickOnCreateButton();

    await promise.all([
      formationTypeUpdatePage.setDescriptionInput('description'),
      formationTypeUpdatePage.setDurationInput('5'),
      formationTypeUpdatePage.documentTypeSelectLastOption(),
      // formationTypeUpdatePage.documentsSelectLastOption(),
    ]);

    expect(await formationTypeUpdatePage.getDescriptionInput()).to.eq(
      'description',
      'Expected Description value to be equals to description'
    );
    expect(await formationTypeUpdatePage.getDurationInput()).to.eq('5', 'Expected duration value to be equals to 5');

    await formationTypeUpdatePage.save();
    expect(await formationTypeUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await formationTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last FormationType', async () => {
    const nbButtonsBeforeDelete = await formationTypeComponentsPage.countDeleteButtons();
    await formationTypeComponentsPage.clickOnLastDeleteButton();

    formationTypeDeleteDialog = new FormationTypeDeleteDialog();
    expect(await formationTypeDeleteDialog.getDialogTitle()).to.eq('komportementalistApp.formationType.delete.question');
    await formationTypeDeleteDialog.clickOnConfirmButton();

    expect(await formationTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

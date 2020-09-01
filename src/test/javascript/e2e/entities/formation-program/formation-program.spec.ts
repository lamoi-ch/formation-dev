import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { FormationProgramComponentsPage, FormationProgramDeleteDialog, FormationProgramUpdatePage } from './formation-program.page-object';

const expect = chai.expect;

describe('FormationProgram e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let formationProgramComponentsPage: FormationProgramComponentsPage;
  let formationProgramUpdatePage: FormationProgramUpdatePage;
  let formationProgramDeleteDialog: FormationProgramDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load FormationPrograms', async () => {
    await navBarPage.goToEntity('formation-program');
    formationProgramComponentsPage = new FormationProgramComponentsPage();
    await browser.wait(ec.visibilityOf(formationProgramComponentsPage.title), 5000);
    expect(await formationProgramComponentsPage.getTitle()).to.eq('komportementalistApp.formationProgram.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(formationProgramComponentsPage.entities), ec.visibilityOf(formationProgramComponentsPage.noResult)),
      1000
    );
  });

  it('should load create FormationProgram page', async () => {
    await formationProgramComponentsPage.clickOnCreateButton();
    formationProgramUpdatePage = new FormationProgramUpdatePage();
    expect(await formationProgramUpdatePage.getPageTitle()).to.eq('komportementalistApp.formationProgram.home.createOrEditLabel');
    await formationProgramUpdatePage.cancel();
  });

  it('should create and save FormationPrograms', async () => {
    const nbButtonsBeforeCreate = await formationProgramComponentsPage.countDeleteButtons();

    await formationProgramComponentsPage.clickOnCreateButton();

    await promise.all([
      formationProgramUpdatePage.setNameInput('name'),
      formationProgramUpdatePage.setDescriptionInput('description'),
      formationProgramUpdatePage.userCategoriesSelectLastOption(),
      formationProgramUpdatePage.programTypeSelectLastOption(),
      formationProgramUpdatePage.profileVariantSelectLastOption(),
      // formationProgramUpdatePage.formationModulesSelectLastOption(),
    ]);

    expect(await formationProgramUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await formationProgramUpdatePage.getDescriptionInput()).to.eq(
      'description',
      'Expected Description value to be equals to description'
    );

    await formationProgramUpdatePage.save();
    expect(await formationProgramUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await formationProgramComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last FormationProgram', async () => {
    const nbButtonsBeforeDelete = await formationProgramComponentsPage.countDeleteButtons();
    await formationProgramComponentsPage.clickOnLastDeleteButton();

    formationProgramDeleteDialog = new FormationProgramDeleteDialog();
    expect(await formationProgramDeleteDialog.getDialogTitle()).to.eq('komportementalistApp.formationProgram.delete.question');
    await formationProgramDeleteDialog.clickOnConfirmButton();

    expect(await formationProgramComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

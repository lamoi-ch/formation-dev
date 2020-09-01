import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProgramTypeComponentsPage, ProgramTypeDeleteDialog, ProgramTypeUpdatePage } from './program-type.page-object';

const expect = chai.expect;

describe('ProgramType e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let programTypeComponentsPage: ProgramTypeComponentsPage;
  let programTypeUpdatePage: ProgramTypeUpdatePage;
  let programTypeDeleteDialog: ProgramTypeDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ProgramTypes', async () => {
    await navBarPage.goToEntity('program-type');
    programTypeComponentsPage = new ProgramTypeComponentsPage();
    await browser.wait(ec.visibilityOf(programTypeComponentsPage.title), 5000);
    expect(await programTypeComponentsPage.getTitle()).to.eq('komportementalistApp.programType.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(programTypeComponentsPage.entities), ec.visibilityOf(programTypeComponentsPage.noResult)),
      1000
    );
  });

  it('should load create ProgramType page', async () => {
    await programTypeComponentsPage.clickOnCreateButton();
    programTypeUpdatePage = new ProgramTypeUpdatePage();
    expect(await programTypeUpdatePage.getPageTitle()).to.eq('komportementalistApp.programType.home.createOrEditLabel');
    await programTypeUpdatePage.cancel();
  });

  it('should create and save ProgramTypes', async () => {
    const nbButtonsBeforeCreate = await programTypeComponentsPage.countDeleteButtons();

    await programTypeComponentsPage.clickOnCreateButton();

    await promise.all([programTypeUpdatePage.setNameInput('name')]);

    expect(await programTypeUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');

    await programTypeUpdatePage.save();
    expect(await programTypeUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await programTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last ProgramType', async () => {
    const nbButtonsBeforeDelete = await programTypeComponentsPage.countDeleteButtons();
    await programTypeComponentsPage.clickOnLastDeleteButton();

    programTypeDeleteDialog = new ProgramTypeDeleteDialog();
    expect(await programTypeDeleteDialog.getDialogTitle()).to.eq('komportementalistApp.programType.delete.question');
    await programTypeDeleteDialog.clickOnConfirmButton();

    expect(await programTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

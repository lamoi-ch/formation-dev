import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { DocumentTypeComponentsPage, DocumentTypeDeleteDialog, DocumentTypeUpdatePage } from './document-type.page-object';

const expect = chai.expect;

describe('DocumentType e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let documentTypeComponentsPage: DocumentTypeComponentsPage;
  let documentTypeUpdatePage: DocumentTypeUpdatePage;
  let documentTypeDeleteDialog: DocumentTypeDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load DocumentTypes', async () => {
    await navBarPage.goToEntity('document-type');
    documentTypeComponentsPage = new DocumentTypeComponentsPage();
    await browser.wait(ec.visibilityOf(documentTypeComponentsPage.title), 5000);
    expect(await documentTypeComponentsPage.getTitle()).to.eq('komportementalistApp.documentType.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(documentTypeComponentsPage.entities), ec.visibilityOf(documentTypeComponentsPage.noResult)),
      1000
    );
  });

  it('should load create DocumentType page', async () => {
    await documentTypeComponentsPage.clickOnCreateButton();
    documentTypeUpdatePage = new DocumentTypeUpdatePage();
    expect(await documentTypeUpdatePage.getPageTitle()).to.eq('komportementalistApp.documentType.home.createOrEditLabel');
    await documentTypeUpdatePage.cancel();
  });

  it('should create and save DocumentTypes', async () => {
    const nbButtonsBeforeCreate = await documentTypeComponentsPage.countDeleteButtons();

    await documentTypeComponentsPage.clickOnCreateButton();

    await promise.all([documentTypeUpdatePage.setNameInput('name')]);

    expect(await documentTypeUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');

    await documentTypeUpdatePage.save();
    expect(await documentTypeUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await documentTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last DocumentType', async () => {
    const nbButtonsBeforeDelete = await documentTypeComponentsPage.countDeleteButtons();
    await documentTypeComponentsPage.clickOnLastDeleteButton();

    documentTypeDeleteDialog = new DocumentTypeDeleteDialog();
    expect(await documentTypeDeleteDialog.getDialogTitle()).to.eq('komportementalistApp.documentType.delete.question');
    await documentTypeDeleteDialog.clickOnConfirmButton();

    expect(await documentTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

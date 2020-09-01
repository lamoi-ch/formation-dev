import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  DocumentCategory1ComponentsPage,
  DocumentCategory1DeleteDialog,
  DocumentCategory1UpdatePage,
} from './document-category-1.page-object';

const expect = chai.expect;

describe('DocumentCategory1 e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let documentCategory1ComponentsPage: DocumentCategory1ComponentsPage;
  let documentCategory1UpdatePage: DocumentCategory1UpdatePage;
  let documentCategory1DeleteDialog: DocumentCategory1DeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load DocumentCategory1s', async () => {
    await navBarPage.goToEntity('document-category-1');
    documentCategory1ComponentsPage = new DocumentCategory1ComponentsPage();
    await browser.wait(ec.visibilityOf(documentCategory1ComponentsPage.title), 5000);
    expect(await documentCategory1ComponentsPage.getTitle()).to.eq('komportementalistApp.documentCategory1.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(documentCategory1ComponentsPage.entities), ec.visibilityOf(documentCategory1ComponentsPage.noResult)),
      1000
    );
  });

  it('should load create DocumentCategory1 page', async () => {
    await documentCategory1ComponentsPage.clickOnCreateButton();
    documentCategory1UpdatePage = new DocumentCategory1UpdatePage();
    expect(await documentCategory1UpdatePage.getPageTitle()).to.eq('komportementalistApp.documentCategory1.home.createOrEditLabel');
    await documentCategory1UpdatePage.cancel();
  });

  it('should create and save DocumentCategory1s', async () => {
    const nbButtonsBeforeCreate = await documentCategory1ComponentsPage.countDeleteButtons();

    await documentCategory1ComponentsPage.clickOnCreateButton();

    await promise.all([documentCategory1UpdatePage.setNameInput('name'), documentCategory1UpdatePage.setDescriptionInput('description')]);

    expect(await documentCategory1UpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await documentCategory1UpdatePage.getDescriptionInput()).to.eq(
      'description',
      'Expected Description value to be equals to description'
    );

    await documentCategory1UpdatePage.save();
    expect(await documentCategory1UpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await documentCategory1ComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last DocumentCategory1', async () => {
    const nbButtonsBeforeDelete = await documentCategory1ComponentsPage.countDeleteButtons();
    await documentCategory1ComponentsPage.clickOnLastDeleteButton();

    documentCategory1DeleteDialog = new DocumentCategory1DeleteDialog();
    expect(await documentCategory1DeleteDialog.getDialogTitle()).to.eq('komportementalistApp.documentCategory1.delete.question');
    await documentCategory1DeleteDialog.clickOnConfirmButton();

    expect(await documentCategory1ComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

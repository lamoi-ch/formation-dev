import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { DocumentCategoryComponentsPage, DocumentCategoryDeleteDialog, DocumentCategoryUpdatePage } from './document-category.page-object';

const expect = chai.expect;

describe('DocumentCategory e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let documentCategoryComponentsPage: DocumentCategoryComponentsPage;
  let documentCategoryUpdatePage: DocumentCategoryUpdatePage;
  let documentCategoryDeleteDialog: DocumentCategoryDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load DocumentCategories', async () => {
    await navBarPage.goToEntity('document-category');
    documentCategoryComponentsPage = new DocumentCategoryComponentsPage();
    await browser.wait(ec.visibilityOf(documentCategoryComponentsPage.title), 5000);
    expect(await documentCategoryComponentsPage.getTitle()).to.eq('komportementalistApp.documentCategory.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(documentCategoryComponentsPage.entities), ec.visibilityOf(documentCategoryComponentsPage.noResult)),
      1000
    );
  });

  it('should load create DocumentCategory page', async () => {
    await documentCategoryComponentsPage.clickOnCreateButton();
    documentCategoryUpdatePage = new DocumentCategoryUpdatePage();
    expect(await documentCategoryUpdatePage.getPageTitle()).to.eq('komportementalistApp.documentCategory.home.createOrEditLabel');
    await documentCategoryUpdatePage.cancel();
  });

  it('should create and save DocumentCategories', async () => {
    const nbButtonsBeforeCreate = await documentCategoryComponentsPage.countDeleteButtons();

    await documentCategoryComponentsPage.clickOnCreateButton();

    await promise.all([documentCategoryUpdatePage.setNameInput('name'), documentCategoryUpdatePage.setDescriptionInput('description')]);

    expect(await documentCategoryUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await documentCategoryUpdatePage.getDescriptionInput()).to.eq(
      'description',
      'Expected Description value to be equals to description'
    );

    await documentCategoryUpdatePage.save();
    expect(await documentCategoryUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await documentCategoryComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last DocumentCategory', async () => {
    const nbButtonsBeforeDelete = await documentCategoryComponentsPage.countDeleteButtons();
    await documentCategoryComponentsPage.clickOnLastDeleteButton();

    documentCategoryDeleteDialog = new DocumentCategoryDeleteDialog();
    expect(await documentCategoryDeleteDialog.getDialogTitle()).to.eq('komportementalistApp.documentCategory.delete.question');
    await documentCategoryDeleteDialog.clickOnConfirmButton();

    expect(await documentCategoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

import { browser, ExpectedConditions as ec /* , protractor, promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  DocumentComponentsPage,
  /* DocumentDeleteDialog, */
  DocumentUpdatePage,
} from './document.page-object';

const expect = chai.expect;

describe('Document e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let documentComponentsPage: DocumentComponentsPage;
  let documentUpdatePage: DocumentUpdatePage;
  /* let documentDeleteDialog: DocumentDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Documents', async () => {
    await navBarPage.goToEntity('document');
    documentComponentsPage = new DocumentComponentsPage();
    await browser.wait(ec.visibilityOf(documentComponentsPage.title), 5000);
    expect(await documentComponentsPage.getTitle()).to.eq('komportementalistApp.document.home.title');
    await browser.wait(ec.or(ec.visibilityOf(documentComponentsPage.entities), ec.visibilityOf(documentComponentsPage.noResult)), 1000);
  });

  it('should load create Document page', async () => {
    await documentComponentsPage.clickOnCreateButton();
    documentUpdatePage = new DocumentUpdatePage();
    expect(await documentUpdatePage.getPageTitle()).to.eq('komportementalistApp.document.home.createOrEditLabel');
    await documentUpdatePage.cancel();
  });

  /* it('should create and save Documents', async () => {
        const nbButtonsBeforeCreate = await documentComponentsPage.countDeleteButtons();

        await documentComponentsPage.clickOnCreateButton();

        await promise.all([
            documentUpdatePage.setNameInput('name'),
            documentUpdatePage.setDescriptionInput('description'),
            documentUpdatePage.setUrlInput('url'),
            documentUpdatePage.setDurationInput('5'),
            documentUpdatePage.setCreationDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            documentUpdatePage.setUserCreationInput('userCreation'),
            documentUpdatePage.setDownloadDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            documentUpdatePage.setUserDownloadInput('userDownload'),
            documentUpdatePage.documentCategorySelectLastOption(),
            documentUpdatePage.documentTypeSelectLastOption(),
        ]);

        expect(await documentUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
        expect(await documentUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
        expect(await documentUpdatePage.getUrlInput()).to.eq('url', 'Expected Url value to be equals to url');
        expect(await documentUpdatePage.getDurationInput()).to.eq('5', 'Expected duration value to be equals to 5');
        expect(await documentUpdatePage.getCreationDateInput()).to.contain('2001-01-01T02:30', 'Expected creationDate value to be equals to 2000-12-31');
        expect(await documentUpdatePage.getUserCreationInput()).to.eq('userCreation', 'Expected UserCreation value to be equals to userCreation');
        expect(await documentUpdatePage.getDownloadDateInput()).to.contain('2001-01-01T02:30', 'Expected downloadDate value to be equals to 2000-12-31');
        expect(await documentUpdatePage.getUserDownloadInput()).to.eq('userDownload', 'Expected UserDownload value to be equals to userDownload');

        await documentUpdatePage.save();
        expect(await documentUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await documentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /* it('should delete last Document', async () => {
        const nbButtonsBeforeDelete = await documentComponentsPage.countDeleteButtons();
        await documentComponentsPage.clickOnLastDeleteButton();

        documentDeleteDialog = new DocumentDeleteDialog();
        expect(await documentDeleteDialog.getDialogTitle())
            .to.eq('komportementalistApp.document.delete.question');
        await documentDeleteDialog.clickOnConfirmButton();

        expect(await documentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

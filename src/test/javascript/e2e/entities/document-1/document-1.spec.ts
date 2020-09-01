import { browser, ExpectedConditions as ec /* , promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  Document1ComponentsPage,
  /* Document1DeleteDialog, */
  Document1UpdatePage,
} from './document-1.page-object';

const expect = chai.expect;

describe('Document1 e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let document1ComponentsPage: Document1ComponentsPage;
  let document1UpdatePage: Document1UpdatePage;
  /* let document1DeleteDialog: Document1DeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Document1s', async () => {
    await navBarPage.goToEntity('document-1');
    document1ComponentsPage = new Document1ComponentsPage();
    await browser.wait(ec.visibilityOf(document1ComponentsPage.title), 5000);
    expect(await document1ComponentsPage.getTitle()).to.eq('komportementalistApp.document1.home.title');
    await browser.wait(ec.or(ec.visibilityOf(document1ComponentsPage.entities), ec.visibilityOf(document1ComponentsPage.noResult)), 1000);
  });

  it('should load create Document1 page', async () => {
    await document1ComponentsPage.clickOnCreateButton();
    document1UpdatePage = new Document1UpdatePage();
    expect(await document1UpdatePage.getPageTitle()).to.eq('komportementalistApp.document1.home.createOrEditLabel');
    await document1UpdatePage.cancel();
  });

  /* it('should create and save Document1s', async () => {
        const nbButtonsBeforeCreate = await document1ComponentsPage.countDeleteButtons();

        await document1ComponentsPage.clickOnCreateButton();

        await promise.all([
            document1UpdatePage.setNameInput('name'),
            // document1UpdatePage.documentCategoriesSelectLastOption(),
        ]);

        expect(await document1UpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');

        await document1UpdatePage.save();
        expect(await document1UpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await document1ComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /* it('should delete last Document1', async () => {
        const nbButtonsBeforeDelete = await document1ComponentsPage.countDeleteButtons();
        await document1ComponentsPage.clickOnLastDeleteButton();

        document1DeleteDialog = new Document1DeleteDialog();
        expect(await document1DeleteDialog.getDialogTitle())
            .to.eq('komportementalistApp.document1.delete.question');
        await document1DeleteDialog.clickOnConfirmButton();

        expect(await document1ComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

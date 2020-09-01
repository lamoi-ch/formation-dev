import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { UserCategoryComponentsPage, UserCategoryDeleteDialog, UserCategoryUpdatePage } from './user-category.page-object';

const expect = chai.expect;

describe('UserCategory e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let userCategoryComponentsPage: UserCategoryComponentsPage;
  let userCategoryUpdatePage: UserCategoryUpdatePage;
  let userCategoryDeleteDialog: UserCategoryDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load UserCategories', async () => {
    await navBarPage.goToEntity('user-category');
    userCategoryComponentsPage = new UserCategoryComponentsPage();
    await browser.wait(ec.visibilityOf(userCategoryComponentsPage.title), 5000);
    expect(await userCategoryComponentsPage.getTitle()).to.eq('komportementalistApp.userCategory.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(userCategoryComponentsPage.entities), ec.visibilityOf(userCategoryComponentsPage.noResult)),
      1000
    );
  });

  it('should load create UserCategory page', async () => {
    await userCategoryComponentsPage.clickOnCreateButton();
    userCategoryUpdatePage = new UserCategoryUpdatePage();
    expect(await userCategoryUpdatePage.getPageTitle()).to.eq('komportementalistApp.userCategory.home.createOrEditLabel');
    await userCategoryUpdatePage.cancel();
  });

  it('should create and save UserCategories', async () => {
    const nbButtonsBeforeCreate = await userCategoryComponentsPage.countDeleteButtons();

    await userCategoryComponentsPage.clickOnCreateButton();

    await promise.all([userCategoryUpdatePage.setNameInput('name')]);

    expect(await userCategoryUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');

    await userCategoryUpdatePage.save();
    expect(await userCategoryUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await userCategoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last UserCategory', async () => {
    const nbButtonsBeforeDelete = await userCategoryComponentsPage.countDeleteButtons();
    await userCategoryComponentsPage.clickOnLastDeleteButton();

    userCategoryDeleteDialog = new UserCategoryDeleteDialog();
    expect(await userCategoryDeleteDialog.getDialogTitle()).to.eq('komportementalistApp.userCategory.delete.question');
    await userCategoryDeleteDialog.clickOnConfirmButton();

    expect(await userCategoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

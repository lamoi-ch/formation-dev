import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProfileVariantComponentsPage, ProfileVariantDeleteDialog, ProfileVariantUpdatePage } from './profile-variant.page-object';

const expect = chai.expect;

describe('ProfileVariant e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let profileVariantComponentsPage: ProfileVariantComponentsPage;
  let profileVariantUpdatePage: ProfileVariantUpdatePage;
  let profileVariantDeleteDialog: ProfileVariantDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ProfileVariants', async () => {
    await navBarPage.goToEntity('profile-variant');
    profileVariantComponentsPage = new ProfileVariantComponentsPage();
    await browser.wait(ec.visibilityOf(profileVariantComponentsPage.title), 5000);
    expect(await profileVariantComponentsPage.getTitle()).to.eq('komportementalistApp.profileVariant.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(profileVariantComponentsPage.entities), ec.visibilityOf(profileVariantComponentsPage.noResult)),
      1000
    );
  });

  it('should load create ProfileVariant page', async () => {
    await profileVariantComponentsPage.clickOnCreateButton();
    profileVariantUpdatePage = new ProfileVariantUpdatePage();
    expect(await profileVariantUpdatePage.getPageTitle()).to.eq('komportementalistApp.profileVariant.home.createOrEditLabel');
    await profileVariantUpdatePage.cancel();
  });

  it('should create and save ProfileVariants', async () => {
    const nbButtonsBeforeCreate = await profileVariantComponentsPage.countDeleteButtons();

    await profileVariantComponentsPage.clickOnCreateButton();

    await promise.all([profileVariantUpdatePage.setNameInput('name')]);

    expect(await profileVariantUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');

    await profileVariantUpdatePage.save();
    expect(await profileVariantUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await profileVariantComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last ProfileVariant', async () => {
    const nbButtonsBeforeDelete = await profileVariantComponentsPage.countDeleteButtons();
    await profileVariantComponentsPage.clickOnLastDeleteButton();

    profileVariantDeleteDialog = new ProfileVariantDeleteDialog();
    expect(await profileVariantDeleteDialog.getDialogTitle()).to.eq('komportementalistApp.profileVariant.delete.question');
    await profileVariantDeleteDialog.clickOnConfirmButton();

    expect(await profileVariantComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

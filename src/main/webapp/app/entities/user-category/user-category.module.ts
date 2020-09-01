import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KomportementalistSharedModule } from 'app/shared/shared.module';
import { UserCategoryComponent } from './user-category.component';
import { UserCategoryDetailComponent } from './user-category-detail.component';
import { UserCategoryUpdateComponent } from './user-category-update.component';
import { UserCategoryDeleteDialogComponent } from './user-category-delete-dialog.component';
import { userCategoryRoute } from './user-category.route';

@NgModule({
  imports: [KomportementalistSharedModule, RouterModule.forChild(userCategoryRoute)],
  declarations: [UserCategoryComponent, UserCategoryDetailComponent, UserCategoryUpdateComponent, UserCategoryDeleteDialogComponent],
  entryComponents: [UserCategoryDeleteDialogComponent],
})
export class KomportementalistUserCategoryModule {}

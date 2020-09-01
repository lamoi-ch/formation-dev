import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KomportementalistSharedModule } from 'app/shared/shared.module';
import { ProfileVariantComponent } from './profile-variant.component';
import { ProfileVariantDetailComponent } from './profile-variant-detail.component';
import { ProfileVariantUpdateComponent } from './profile-variant-update.component';
import { ProfileVariantDeleteDialogComponent } from './profile-variant-delete-dialog.component';
import { profileVariantRoute } from './profile-variant.route';

@NgModule({
  imports: [KomportementalistSharedModule, RouterModule.forChild(profileVariantRoute)],
  declarations: [
    ProfileVariantComponent,
    ProfileVariantDetailComponent,
    ProfileVariantUpdateComponent,
    ProfileVariantDeleteDialogComponent,
  ],
  entryComponents: [ProfileVariantDeleteDialogComponent],
})
export class KomportementalistProfileVariantModule {}

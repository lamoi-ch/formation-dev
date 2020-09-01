import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KomportementalistSharedModule } from 'app/shared/shared.module';
import { FormationTypeComponent } from './formation-type.component';
import { FormationTypeDetailComponent } from './formation-type-detail.component';
import { FormationTypeUpdateComponent } from './formation-type-update.component';
import { FormationTypeDeleteDialogComponent } from './formation-type-delete-dialog.component';
import { formationTypeRoute } from './formation-type.route';

@NgModule({
  imports: [KomportementalistSharedModule, RouterModule.forChild(formationTypeRoute)],
  declarations: [FormationTypeComponent, FormationTypeDetailComponent, FormationTypeUpdateComponent, FormationTypeDeleteDialogComponent],
  entryComponents: [FormationTypeDeleteDialogComponent],
})
export class KomportementalistFormationTypeModule {}

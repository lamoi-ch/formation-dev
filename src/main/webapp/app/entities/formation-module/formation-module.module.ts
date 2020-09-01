import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KomportementalistSharedModule } from 'app/shared/shared.module';
import { FormationModuleComponent } from './formation-module.component';
import { FormationModuleDetailComponent } from './formation-module-detail.component';
import { FormationModuleUpdateComponent } from './formation-module-update.component';
import { FormationModuleDeleteDialogComponent } from './formation-module-delete-dialog.component';
import { formationModuleRoute } from './formation-module.route';

@NgModule({
  imports: [KomportementalistSharedModule, RouterModule.forChild(formationModuleRoute)],
  declarations: [
    FormationModuleComponent,
    FormationModuleDetailComponent,
    FormationModuleUpdateComponent,
    FormationModuleDeleteDialogComponent,
  ],
  entryComponents: [FormationModuleDeleteDialogComponent],
})
export class KomportementalistFormationModuleModule {}

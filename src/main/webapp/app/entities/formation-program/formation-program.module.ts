import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KomportementalistSharedModule } from 'app/shared/shared.module';
import { FormationProgramComponent } from './formation-program.component';
import { FormationProgramDetailComponent } from './formation-program-detail.component';
import { FormationProgramUpdateComponent } from './formation-program-update.component';
import { FormationProgramDeleteDialogComponent } from './formation-program-delete-dialog.component';
import { formationProgramRoute } from './formation-program.route';

@NgModule({
  imports: [KomportementalistSharedModule, RouterModule.forChild(formationProgramRoute)],
  declarations: [
    FormationProgramComponent,
    FormationProgramDetailComponent,
    FormationProgramUpdateComponent,
    FormationProgramDeleteDialogComponent,
  ],
  entryComponents: [FormationProgramDeleteDialogComponent],
})
export class KomportementalistFormationProgramModule {}

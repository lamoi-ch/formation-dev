import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KomportementalistSharedModule } from 'app/shared/shared.module';
import { ProgramTypeComponent } from './program-type.component';
import { ProgramTypeDetailComponent } from './program-type-detail.component';
import { ProgramTypeUpdateComponent } from './program-type-update.component';
import { ProgramTypeDeleteDialogComponent } from './program-type-delete-dialog.component';
import { programTypeRoute } from './program-type.route';

@NgModule({
  imports: [KomportementalistSharedModule, RouterModule.forChild(programTypeRoute)],
  declarations: [ProgramTypeComponent, ProgramTypeDetailComponent, ProgramTypeUpdateComponent, ProgramTypeDeleteDialogComponent],
  entryComponents: [ProgramTypeDeleteDialogComponent],
})
export class KomportementalistProgramTypeModule {}

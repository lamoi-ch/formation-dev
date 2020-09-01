import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KomportementalistSharedModule } from 'app/shared/shared.module';
import { Document1Component } from './document-1.component';
import { Document1DetailComponent } from './document-1-detail.component';
import { Document1UpdateComponent } from './document-1-update.component';
import { Document1DeleteDialogComponent } from './document-1-delete-dialog.component';
import { document1Route } from './document-1.route';

@NgModule({
  imports: [KomportementalistSharedModule, RouterModule.forChild(document1Route)],
  declarations: [Document1Component, Document1DetailComponent, Document1UpdateComponent, Document1DeleteDialogComponent],
  entryComponents: [Document1DeleteDialogComponent],
})
export class KomportementalistDocument1Module {}

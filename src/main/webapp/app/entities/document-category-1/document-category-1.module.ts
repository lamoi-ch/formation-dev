import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KomportementalistSharedModule } from 'app/shared/shared.module';
import { DocumentCategory1Component } from './document-category-1.component';
import { DocumentCategory1DetailComponent } from './document-category-1-detail.component';
import { DocumentCategory1UpdateComponent } from './document-category-1-update.component';
import { DocumentCategory1DeleteDialogComponent } from './document-category-1-delete-dialog.component';
import { documentCategory1Route } from './document-category-1.route';

@NgModule({
  imports: [KomportementalistSharedModule, RouterModule.forChild(documentCategory1Route)],
  declarations: [
    DocumentCategory1Component,
    DocumentCategory1DetailComponent,
    DocumentCategory1UpdateComponent,
    DocumentCategory1DeleteDialogComponent,
  ],
  entryComponents: [DocumentCategory1DeleteDialogComponent],
})
export class KomportementalistDocumentCategory1Module {}

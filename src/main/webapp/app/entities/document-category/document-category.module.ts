import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KomportementalistSharedModule } from 'app/shared/shared.module';
import { DocumentCategoryComponent } from './document-category.component';
import { DocumentCategoryDetailComponent } from './document-category-detail.component';
import { DocumentCategoryUpdateComponent } from './document-category-update.component';
import { DocumentCategoryDeleteDialogComponent } from './document-category-delete-dialog.component';
import { documentCategoryRoute } from './document-category.route';

@NgModule({
  imports: [KomportementalistSharedModule, RouterModule.forChild(documentCategoryRoute)],
  declarations: [
    DocumentCategoryComponent,
    DocumentCategoryDetailComponent,
    DocumentCategoryUpdateComponent,
    DocumentCategoryDeleteDialogComponent,
  ],
  entryComponents: [DocumentCategoryDeleteDialogComponent],
})
export class KomportementalistDocumentCategoryModule {}

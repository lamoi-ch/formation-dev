import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'document-category',
        loadChildren: () => import('./document-category/document-category.module').then(m => m.KomportementalistDocumentCategoryModule),
      },
      {
        path: 'document-category-1',
        loadChildren: () =>
          import('./document-category-1/document-category-1.module').then(m => m.KomportementalistDocumentCategory1Module),
      },
      {
        path: 'document-1',
        loadChildren: () => import('./document-1/document-1.module').then(m => m.KomportementalistDocument1Module),
      },
      {
        path: 'document',
        loadChildren: () => import('./document/document.module').then(m => m.KomportementalistDocumentModule),
      },
      {
        path: 'document-type',
        loadChildren: () => import('./document-type/document-type.module').then(m => m.KomportementalistDocumentTypeModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class KomportementalistEntityModule {}

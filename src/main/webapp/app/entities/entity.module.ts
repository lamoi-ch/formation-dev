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
        path: 'document',
        loadChildren: () => import('./document/document.module').then(m => m.KomportementalistDocumentModule),
      },
      {
        path: 'document-type',
        loadChildren: () => import('./document-type/document-type.module').then(m => m.KomportementalistDocumentTypeModule),
      },
      {
        path: 'formation-type',
        loadChildren: () => import('./formation-type/formation-type.module').then(m => m.KomportementalistFormationTypeModule),
      },
      {
        path: 'formation-module',
        loadChildren: () => import('./formation-module/formation-module.module').then(m => m.KomportementalistFormationModuleModule),
      },
      {
        path: 'program-type',
        loadChildren: () => import('./program-type/program-type.module').then(m => m.KomportementalistProgramTypeModule),
      },
      {
        path: 'formation-program',
        loadChildren: () => import('./formation-program/formation-program.module').then(m => m.KomportementalistFormationProgramModule),
      },
      {
        path: 'profile-variant',
        loadChildren: () => import('./profile-variant/profile-variant.module').then(m => m.KomportementalistProfileVariantModule),
      },
      {
        path: 'user-category',
        loadChildren: () => import('./user-category/user-category.module').then(m => m.KomportementalistUserCategoryModule),
      },
      ,
      {
        path: 'user-extra',
        loadChildren: () => import('./user-extra/user-extra.module').then(m => m.KomportementalistUserExtraModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class KomportementalistEntityModule {}

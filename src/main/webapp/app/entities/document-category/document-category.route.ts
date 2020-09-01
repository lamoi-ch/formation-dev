import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDocumentCategory, DocumentCategory } from 'app/shared/model/document-category.model';
import { DocumentCategoryService } from './document-category.service';
import { DocumentCategoryComponent } from './document-category.component';
import { DocumentCategoryDetailComponent } from './document-category-detail.component';
import { DocumentCategoryUpdateComponent } from './document-category-update.component';

@Injectable({ providedIn: 'root' })
export class DocumentCategoryResolve implements Resolve<IDocumentCategory> {
  constructor(private service: DocumentCategoryService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDocumentCategory> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((documentCategory: HttpResponse<DocumentCategory>) => {
          if (documentCategory.body) {
            return of(documentCategory.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DocumentCategory());
  }
}

export const documentCategoryRoute: Routes = [
  {
    path: '',
    component: DocumentCategoryComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'komportementalistApp.documentCategory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DocumentCategoryDetailComponent,
    resolve: {
      documentCategory: DocumentCategoryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'komportementalistApp.documentCategory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DocumentCategoryUpdateComponent,
    resolve: {
      documentCategory: DocumentCategoryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'komportementalistApp.documentCategory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DocumentCategoryUpdateComponent,
    resolve: {
      documentCategory: DocumentCategoryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'komportementalistApp.documentCategory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];

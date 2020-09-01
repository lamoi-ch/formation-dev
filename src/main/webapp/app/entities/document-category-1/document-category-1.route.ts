import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDocumentCategory1, DocumentCategory1 } from 'app/shared/model/document-category-1.model';
import { DocumentCategory1Service } from './document-category-1.service';
import { DocumentCategory1Component } from './document-category-1.component';
import { DocumentCategory1DetailComponent } from './document-category-1-detail.component';
import { DocumentCategory1UpdateComponent } from './document-category-1-update.component';

@Injectable({ providedIn: 'root' })
export class DocumentCategory1Resolve implements Resolve<IDocumentCategory1> {
  constructor(private service: DocumentCategory1Service, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDocumentCategory1> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((documentCategory1: HttpResponse<DocumentCategory1>) => {
          if (documentCategory1.body) {
            return of(documentCategory1.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DocumentCategory1());
  }
}

export const documentCategory1Route: Routes = [
  {
    path: '',
    component: DocumentCategory1Component,
    resolve: {
      pagingParams: JhiResolvePagingParams,
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'komportementalistApp.documentCategory1.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DocumentCategory1DetailComponent,
    resolve: {
      documentCategory1: DocumentCategory1Resolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'komportementalistApp.documentCategory1.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DocumentCategory1UpdateComponent,
    resolve: {
      documentCategory1: DocumentCategory1Resolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'komportementalistApp.documentCategory1.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DocumentCategory1UpdateComponent,
    resolve: {
      documentCategory1: DocumentCategory1Resolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'komportementalistApp.documentCategory1.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];

import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDocument1, Document1 } from 'app/shared/model/document-1.model';
import { Document1Service } from './document-1.service';
import { Document1Component } from './document-1.component';
import { Document1DetailComponent } from './document-1-detail.component';
import { Document1UpdateComponent } from './document-1-update.component';

@Injectable({ providedIn: 'root' })
export class Document1Resolve implements Resolve<IDocument1> {
  constructor(private service: Document1Service, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDocument1> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((document1: HttpResponse<Document1>) => {
          if (document1.body) {
            return of(document1.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Document1());
  }
}

export const document1Route: Routes = [
  {
    path: '',
    component: Document1Component,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'komportementalistApp.document1.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: Document1DetailComponent,
    resolve: {
      document1: Document1Resolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'komportementalistApp.document1.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: Document1UpdateComponent,
    resolve: {
      document1: Document1Resolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'komportementalistApp.document1.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: Document1UpdateComponent,
    resolve: {
      document1: Document1Resolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'komportementalistApp.document1.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];

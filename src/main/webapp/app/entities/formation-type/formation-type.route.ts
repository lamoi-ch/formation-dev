import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IFormationType, FormationType } from 'app/shared/model/formation-type.model';
import { FormationTypeService } from './formation-type.service';
import { FormationTypeComponent } from './formation-type.component';
import { FormationTypeDetailComponent } from './formation-type-detail.component';
import { FormationTypeUpdateComponent } from './formation-type-update.component';

@Injectable({ providedIn: 'root' })
export class FormationTypeResolve implements Resolve<IFormationType> {
  constructor(private service: FormationTypeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFormationType> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((formationType: HttpResponse<FormationType>) => {
          if (formationType.body) {
            return of(formationType.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new FormationType());
  }
}

export const formationTypeRoute: Routes = [
  {
    path: '',
    component: FormationTypeComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'komportementalistApp.formationType.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FormationTypeDetailComponent,
    resolve: {
      formationType: FormationTypeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'komportementalistApp.formationType.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FormationTypeUpdateComponent,
    resolve: {
      formationType: FormationTypeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'komportementalistApp.formationType.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FormationTypeUpdateComponent,
    resolve: {
      formationType: FormationTypeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'komportementalistApp.formationType.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];

import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProgramType, ProgramType } from 'app/shared/model/program-type.model';
import { ProgramTypeService } from './program-type.service';
import { ProgramTypeComponent } from './program-type.component';
import { ProgramTypeDetailComponent } from './program-type-detail.component';
import { ProgramTypeUpdateComponent } from './program-type-update.component';

@Injectable({ providedIn: 'root' })
export class ProgramTypeResolve implements Resolve<IProgramType> {
  constructor(private service: ProgramTypeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProgramType> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((programType: HttpResponse<ProgramType>) => {
          if (programType.body) {
            return of(programType.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ProgramType());
  }
}

export const programTypeRoute: Routes = [
  {
    path: '',
    component: ProgramTypeComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'komportementalistApp.programType.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProgramTypeDetailComponent,
    resolve: {
      programType: ProgramTypeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'komportementalistApp.programType.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProgramTypeUpdateComponent,
    resolve: {
      programType: ProgramTypeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'komportementalistApp.programType.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProgramTypeUpdateComponent,
    resolve: {
      programType: ProgramTypeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'komportementalistApp.programType.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];

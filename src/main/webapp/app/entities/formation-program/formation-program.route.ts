import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IFormationProgram, FormationProgram } from 'app/shared/model/formation-program.model';
import { FormationProgramService } from './formation-program.service';
import { FormationProgramComponent } from './formation-program.component';
import { FormationProgramDetailComponent } from './formation-program-detail.component';
import { FormationProgramUpdateComponent } from './formation-program-update.component';

@Injectable({ providedIn: 'root' })
export class FormationProgramResolve implements Resolve<IFormationProgram> {
  constructor(private service: FormationProgramService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFormationProgram> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((formationProgram: HttpResponse<FormationProgram>) => {
          if (formationProgram.body) {
            return of(formationProgram.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new FormationProgram());
  }
}

export const formationProgramRoute: Routes = [
  {
    path: '',
    component: FormationProgramComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'komportementalistApp.formationProgram.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FormationProgramDetailComponent,
    resolve: {
      formationProgram: FormationProgramResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'komportementalistApp.formationProgram.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FormationProgramUpdateComponent,
    resolve: {
      formationProgram: FormationProgramResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'komportementalistApp.formationProgram.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FormationProgramUpdateComponent,
    resolve: {
      formationProgram: FormationProgramResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'komportementalistApp.formationProgram.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];

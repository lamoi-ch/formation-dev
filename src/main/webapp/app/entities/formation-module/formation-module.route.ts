import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IFormationModule, FormationModule } from 'app/shared/model/formation-module.model';
import { FormationModuleService } from './formation-module.service';
import { FormationModuleComponent } from './formation-module.component';
import { FormationModuleDetailComponent } from './formation-module-detail.component';
import { FormationModuleUpdateComponent } from './formation-module-update.component';

@Injectable({ providedIn: 'root' })
export class FormationModuleResolve implements Resolve<IFormationModule> {
  constructor(private service: FormationModuleService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFormationModule> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((formationModule: HttpResponse<FormationModule>) => {
          if (formationModule.body) {
            return of(formationModule.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new FormationModule());
  }
}

export const formationModuleRoute: Routes = [
  {
    path: '',
    component: FormationModuleComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'komportementalistApp.formationModule.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FormationModuleDetailComponent,
    resolve: {
      formationModule: FormationModuleResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'komportementalistApp.formationModule.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FormationModuleUpdateComponent,
    resolve: {
      formationModule: FormationModuleResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'komportementalistApp.formationModule.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FormationModuleUpdateComponent,
    resolve: {
      formationModule: FormationModuleResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'komportementalistApp.formationModule.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];

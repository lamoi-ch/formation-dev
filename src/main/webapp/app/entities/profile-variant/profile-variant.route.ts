import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProfileVariant, ProfileVariant } from 'app/shared/model/profile-variant.model';
import { ProfileVariantService } from './profile-variant.service';
import { ProfileVariantComponent } from './profile-variant.component';
import { ProfileVariantDetailComponent } from './profile-variant-detail.component';
import { ProfileVariantUpdateComponent } from './profile-variant-update.component';

@Injectable({ providedIn: 'root' })
export class ProfileVariantResolve implements Resolve<IProfileVariant> {
  constructor(private service: ProfileVariantService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProfileVariant> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((profileVariant: HttpResponse<ProfileVariant>) => {
          if (profileVariant.body) {
            return of(profileVariant.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ProfileVariant());
  }
}

export const profileVariantRoute: Routes = [
  {
    path: '',
    component: ProfileVariantComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'komportementalistApp.profileVariant.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProfileVariantDetailComponent,
    resolve: {
      profileVariant: ProfileVariantResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'komportementalistApp.profileVariant.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProfileVariantUpdateComponent,
    resolve: {
      profileVariant: ProfileVariantResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'komportementalistApp.profileVariant.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProfileVariantUpdateComponent,
    resolve: {
      profileVariant: ProfileVariantResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'komportementalistApp.profileVariant.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];

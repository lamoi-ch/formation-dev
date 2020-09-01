import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IUserCategory, UserCategory } from 'app/shared/model/user-category.model';
import { UserCategoryService } from './user-category.service';
import { UserCategoryComponent } from './user-category.component';
import { UserCategoryDetailComponent } from './user-category-detail.component';
import { UserCategoryUpdateComponent } from './user-category-update.component';

@Injectable({ providedIn: 'root' })
export class UserCategoryResolve implements Resolve<IUserCategory> {
  constructor(private service: UserCategoryService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUserCategory> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((userCategory: HttpResponse<UserCategory>) => {
          if (userCategory.body) {
            return of(userCategory.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new UserCategory());
  }
}

export const userCategoryRoute: Routes = [
  {
    path: '',
    component: UserCategoryComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'komportementalistApp.userCategory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: UserCategoryDetailComponent,
    resolve: {
      userCategory: UserCategoryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'komportementalistApp.userCategory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: UserCategoryUpdateComponent,
    resolve: {
      userCategory: UserCategoryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'komportementalistApp.userCategory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: UserCategoryUpdateComponent,
    resolve: {
      userCategory: UserCategoryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'komportementalistApp.userCategory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];

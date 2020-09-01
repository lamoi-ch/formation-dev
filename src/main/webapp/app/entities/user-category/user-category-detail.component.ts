import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUserCategory } from 'app/shared/model/user-category.model';

@Component({
  selector: 'jhi-user-category-detail',
  templateUrl: './user-category-detail.component.html',
})
export class UserCategoryDetailComponent implements OnInit {
  userCategory: IUserCategory | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userCategory }) => (this.userCategory = userCategory));
  }

  previousState(): void {
    window.history.back();
  }
}

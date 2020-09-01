import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IUserCategory, UserCategory } from 'app/shared/model/user-category.model';
import { UserCategoryService } from './user-category.service';

@Component({
  selector: 'jhi-user-category-update',
  templateUrl: './user-category-update.component.html',
})
export class UserCategoryUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [],
  });

  constructor(protected userCategoryService: UserCategoryService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userCategory }) => {
      this.updateForm(userCategory);
    });
  }

  updateForm(userCategory: IUserCategory): void {
    this.editForm.patchValue({
      id: userCategory.id,
      name: userCategory.name,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const userCategory = this.createFromForm();
    if (userCategory.id !== undefined) {
      this.subscribeToSaveResponse(this.userCategoryService.update(userCategory));
    } else {
      this.subscribeToSaveResponse(this.userCategoryService.create(userCategory));
    }
  }

  private createFromForm(): IUserCategory {
    return {
      ...new UserCategory(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserCategory>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}

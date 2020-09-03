import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IUserExtra, UserExtra } from 'app/shared/model/user-extra.model';
import { UserExtraService } from './user-extra.service';
import { IUserCategory } from 'app/shared/model/user-category.model';
import { UserCategoryService } from 'app/entities/user-category/user-category.service';

@Component({
  selector: 'jhi-user-extra-update',
  templateUrl: './user-extra-update.component.html',
})
export class UserExtraUpdateComponent implements OnInit {
  isSaving = false;
  usercategories: IUserCategory[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    userCategory: [],
  });

  constructor(
    protected userExtraService: UserExtraService,
    protected userCategoryService: UserCategoryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userExtra }) => {
      this.updateForm(userExtra);

      this.userCategoryService.query().subscribe((res: HttpResponse<IUserCategory[]>) => (this.usercategories = res.body || []));
    });
  }

  updateForm(userExtra: IUserExtra): void {
    this.editForm.patchValue({
      id: userExtra.id,
      name: userExtra.name,
      userCategory: userExtra.userCategory,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const userExtra = this.createFromForm();
    if (userExtra.id !== undefined) {
      this.subscribeToSaveResponse(this.userExtraService.update(userExtra));
    } else {
      this.subscribeToSaveResponse(this.userExtraService.create(userExtra));
    }
  }

  private createFromForm(): IUserExtra {
    return {
      ...new UserExtra(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      userCategory: this.editForm.get(['userCategory'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserExtra>>): void {
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

  trackById(index: number, item: IUserCategory): any {
    return item.id;
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProfileVariant, ProfileVariant } from 'app/shared/model/profile-variant.model';
import { ProfileVariantService } from './profile-variant.service';

@Component({
  selector: 'jhi-profile-variant-update',
  templateUrl: './profile-variant-update.component.html',
})
export class ProfileVariantUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [],
  });

  constructor(protected profileVariantService: ProfileVariantService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ profileVariant }) => {
      this.updateForm(profileVariant);
    });
  }

  updateForm(profileVariant: IProfileVariant): void {
    this.editForm.patchValue({
      id: profileVariant.id,
      name: profileVariant.name,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const profileVariant = this.createFromForm();
    if (profileVariant.id !== undefined) {
      this.subscribeToSaveResponse(this.profileVariantService.update(profileVariant));
    } else {
      this.subscribeToSaveResponse(this.profileVariantService.create(profileVariant));
    }
  }

  private createFromForm(): IProfileVariant {
    return {
      ...new ProfileVariant(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProfileVariant>>): void {
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

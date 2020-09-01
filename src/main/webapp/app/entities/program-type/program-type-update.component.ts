import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProgramType, ProgramType } from 'app/shared/model/program-type.model';
import { ProgramTypeService } from './program-type.service';

@Component({
  selector: 'jhi-program-type-update',
  templateUrl: './program-type-update.component.html',
})
export class ProgramTypeUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [],
  });

  constructor(protected programTypeService: ProgramTypeService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ programType }) => {
      this.updateForm(programType);
    });
  }

  updateForm(programType: IProgramType): void {
    this.editForm.patchValue({
      id: programType.id,
      name: programType.name,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const programType = this.createFromForm();
    if (programType.id !== undefined) {
      this.subscribeToSaveResponse(this.programTypeService.update(programType));
    } else {
      this.subscribeToSaveResponse(this.programTypeService.create(programType));
    }
  }

  private createFromForm(): IProgramType {
    return {
      ...new ProgramType(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProgramType>>): void {
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

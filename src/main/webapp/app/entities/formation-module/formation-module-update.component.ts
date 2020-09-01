import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IFormationModule, FormationModule } from 'app/shared/model/formation-module.model';
import { FormationModuleService } from './formation-module.service';
import { IFormationType } from 'app/shared/model/formation-type.model';
import { FormationTypeService } from 'app/entities/formation-type/formation-type.service';

@Component({
  selector: 'jhi-formation-module-update',
  templateUrl: './formation-module-update.component.html',
})
export class FormationModuleUpdateComponent implements OnInit {
  isSaving = false;
  formationtypes: IFormationType[] = [];

  editForm = this.fb.group({
    id: [],
    code: [],
    name: [],
    description: [],
    formationTypes: [],
  });

  constructor(
    protected formationModuleService: FormationModuleService,
    protected formationTypeService: FormationTypeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ formationModule }) => {
      this.updateForm(formationModule);

      this.formationTypeService.query().subscribe((res: HttpResponse<IFormationType[]>) => (this.formationtypes = res.body || []));
    });
  }

  updateForm(formationModule: IFormationModule): void {
    this.editForm.patchValue({
      id: formationModule.id,
      code: formationModule.code,
      name: formationModule.name,
      description: formationModule.description,
      formationTypes: formationModule.formationTypes,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const formationModule = this.createFromForm();
    if (formationModule.id !== undefined) {
      this.subscribeToSaveResponse(this.formationModuleService.update(formationModule));
    } else {
      this.subscribeToSaveResponse(this.formationModuleService.create(formationModule));
    }
  }

  private createFromForm(): IFormationModule {
    return {
      ...new FormationModule(),
      id: this.editForm.get(['id'])!.value,
      code: this.editForm.get(['code'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      formationTypes: this.editForm.get(['formationTypes'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFormationModule>>): void {
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

  trackById(index: number, item: IFormationType): any {
    return item.id;
  }

  getSelected(selectedVals: IFormationType[], option: IFormationType): IFormationType {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}

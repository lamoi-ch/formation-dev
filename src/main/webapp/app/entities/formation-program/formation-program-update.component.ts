import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IFormationProgram, FormationProgram } from 'app/shared/model/formation-program.model';
import { FormationProgramService } from './formation-program.service';
import { IUserCategory } from 'app/shared/model/user-category.model';
import { UserCategoryService } from 'app/entities/user-category/user-category.service';
import { IProgramType } from 'app/shared/model/program-type.model';
import { ProgramTypeService } from 'app/entities/program-type/program-type.service';
import { IProfileVariant } from 'app/shared/model/profile-variant.model';
import { ProfileVariantService } from 'app/entities/profile-variant/profile-variant.service';
import { IFormationModule } from 'app/shared/model/formation-module.model';
import { FormationModuleService } from 'app/entities/formation-module/formation-module.service';

type SelectableEntity = IUserCategory | IProgramType | IProfileVariant | IFormationModule;

@Component({
  selector: 'jhi-formation-program-update',
  templateUrl: './formation-program-update.component.html',
})
export class FormationProgramUpdateComponent implements OnInit {
  isSaving = false;
  usercategories: IUserCategory[] = [];
  programtypes: IProgramType[] = [];
  profilevariants: IProfileVariant[] = [];
  formationmodules: IFormationModule[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    description: [],
    userCategories: [],
    programType: [],
    profileVariant: [],
    formationModules: [],
  });

  constructor(
    protected formationProgramService: FormationProgramService,
    protected userCategoryService: UserCategoryService,
    protected programTypeService: ProgramTypeService,
    protected profileVariantService: ProfileVariantService,
    protected formationModuleService: FormationModuleService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ formationProgram }) => {
      this.updateForm(formationProgram);

      this.userCategoryService.query().subscribe((res: HttpResponse<IUserCategory[]>) => (this.usercategories = res.body || []));

      this.programTypeService.query().subscribe((res: HttpResponse<IProgramType[]>) => (this.programtypes = res.body || []));

      this.profileVariantService.query().subscribe((res: HttpResponse<IProfileVariant[]>) => (this.profilevariants = res.body || []));

      this.formationModuleService.query().subscribe((res: HttpResponse<IFormationModule[]>) => (this.formationmodules = res.body || []));
    });
  }

  updateForm(formationProgram: IFormationProgram): void {
    this.editForm.patchValue({
      id: formationProgram.id,
      name: formationProgram.name,
      description: formationProgram.description,
      userCategories: formationProgram.userCategories,
      programType: formationProgram.programType,
      profileVariant: formationProgram.profileVariant,
      formationModules: formationProgram.formationModules,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const formationProgram = this.createFromForm();
    if (formationProgram.id !== undefined) {
      this.subscribeToSaveResponse(this.formationProgramService.update(formationProgram));
    } else {
      this.subscribeToSaveResponse(this.formationProgramService.create(formationProgram));
    }
  }

  private createFromForm(): IFormationProgram {
    return {
      ...new FormationProgram(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      userCategories: this.editForm.get(['userCategories'])!.value,
      programType: this.editForm.get(['programType'])!.value,
      profileVariant: this.editForm.get(['profileVariant'])!.value,
      formationModules: this.editForm.get(['formationModules'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFormationProgram>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }

  getSelected(selectedVals: IFormationModule[], option: IFormationModule): IFormationModule {
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

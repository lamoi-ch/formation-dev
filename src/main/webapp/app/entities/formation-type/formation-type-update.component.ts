import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IFormationType, FormationType } from 'app/shared/model/formation-type.model';
import { FormationTypeService } from './formation-type.service';
import { IDocumentType } from 'app/shared/model/document-type.model';
import { DocumentTypeService } from 'app/entities/document-type/document-type.service';
import { IDocument } from 'app/shared/model/document.model';
import { DocumentService } from 'app/entities/document/document.service';

type SelectableEntity = IDocumentType | IDocument;

@Component({
  selector: 'jhi-formation-type-update',
  templateUrl: './formation-type-update.component.html',
})
export class FormationTypeUpdateComponent implements OnInit {
  isSaving = false;
  documenttypes: IDocumentType[] = [];
  documents: IDocument[] = [];

  editForm = this.fb.group({
    id: [],
    description: [],
    duration: [],
    documentType: [],
    documents: [],
  });

  constructor(
    protected formationTypeService: FormationTypeService,
    protected documentTypeService: DocumentTypeService,
    protected documentService: DocumentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ formationType }) => {
      this.updateForm(formationType);

      this.documentTypeService.query().subscribe((res: HttpResponse<IDocumentType[]>) => (this.documenttypes = res.body || []));

      this.documentService.query().subscribe((res: HttpResponse<IDocument[]>) => (this.documents = res.body || []));
    });
  }

  updateForm(formationType: IFormationType): void {
    this.editForm.patchValue({
      id: formationType.id,
      description: formationType.description,
      duration: formationType.duration,
      documentType: formationType.documentType,
      documents: formationType.documents,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const formationType = this.createFromForm();
    if (formationType.id !== undefined) {
      this.subscribeToSaveResponse(this.formationTypeService.update(formationType));
    } else {
      this.subscribeToSaveResponse(this.formationTypeService.create(formationType));
    }
  }

  private createFromForm(): IFormationType {
    return {
      ...new FormationType(),
      id: this.editForm.get(['id'])!.value,
      description: this.editForm.get(['description'])!.value,
      duration: this.editForm.get(['duration'])!.value,
      documentType: this.editForm.get(['documentType'])!.value,
      documents: this.editForm.get(['documents'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFormationType>>): void {
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

  getSelected(selectedVals: IDocument[], option: IDocument): IDocument {
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

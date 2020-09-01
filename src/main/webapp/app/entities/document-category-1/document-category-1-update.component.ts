import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IDocumentCategory1, DocumentCategory1 } from 'app/shared/model/document-category-1.model';
import { DocumentCategory1Service } from './document-category-1.service';

@Component({
  selector: 'jhi-document-category-1-update',
  templateUrl: './document-category-1-update.component.html',
})
export class DocumentCategory1UpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    description: [],
  });

  constructor(
    protected documentCategory1Service: DocumentCategory1Service,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ documentCategory1 }) => {
      this.updateForm(documentCategory1);
    });
  }

  updateForm(documentCategory1: IDocumentCategory1): void {
    this.editForm.patchValue({
      id: documentCategory1.id,
      name: documentCategory1.name,
      description: documentCategory1.description,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const documentCategory1 = this.createFromForm();
    if (documentCategory1.id !== undefined) {
      this.subscribeToSaveResponse(this.documentCategory1Service.update(documentCategory1));
    } else {
      this.subscribeToSaveResponse(this.documentCategory1Service.create(documentCategory1));
    }
  }

  private createFromForm(): IDocumentCategory1 {
    return {
      ...new DocumentCategory1(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDocumentCategory1>>): void {
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

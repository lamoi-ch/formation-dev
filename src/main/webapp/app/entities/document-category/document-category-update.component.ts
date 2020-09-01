import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IDocumentCategory, DocumentCategory } from 'app/shared/model/document-category.model';
import { DocumentCategoryService } from './document-category.service';

@Component({
  selector: 'jhi-document-category-update',
  templateUrl: './document-category-update.component.html',
})
export class DocumentCategoryUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [],
    description: [],
  });

  constructor(
    protected documentCategoryService: DocumentCategoryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ documentCategory }) => {
      this.updateForm(documentCategory);
    });
  }

  updateForm(documentCategory: IDocumentCategory): void {
    this.editForm.patchValue({
      id: documentCategory.id,
      name: documentCategory.name,
      description: documentCategory.description,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const documentCategory = this.createFromForm();
    if (documentCategory.id !== undefined) {
      this.subscribeToSaveResponse(this.documentCategoryService.update(documentCategory));
    } else {
      this.subscribeToSaveResponse(this.documentCategoryService.create(documentCategory));
    }
  }

  private createFromForm(): IDocumentCategory {
    return {
      ...new DocumentCategory(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDocumentCategory>>): void {
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

import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IDocument1, Document1 } from 'app/shared/model/document-1.model';
import { Document1Service } from './document-1.service';
import { IDocumentCategory1 } from 'app/shared/model/document-category-1.model';
import { DocumentCategory1Service } from 'app/entities/document-category-1/document-category-1.service';

@Component({
  selector: 'jhi-document-1-update',
  templateUrl: './document-1-update.component.html',
})
export class Document1UpdateComponent implements OnInit {
  isSaving = false;
  documentcategory1s: IDocumentCategory1[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    documentCategories: [null, Validators.required],
  });

  constructor(
    protected document1Service: Document1Service,
    protected documentCategory1Service: DocumentCategory1Service,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ document1 }) => {
      this.updateForm(document1);

      this.documentCategory1Service
        .query()
        .subscribe((res: HttpResponse<IDocumentCategory1[]>) => (this.documentcategory1s = res.body || []));
    });
  }

  updateForm(document1: IDocument1): void {
    this.editForm.patchValue({
      id: document1.id,
      name: document1.name,
      documentCategories: document1.documentCategories,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const document1 = this.createFromForm();
    if (document1.id !== undefined) {
      this.subscribeToSaveResponse(this.document1Service.update(document1));
    } else {
      this.subscribeToSaveResponse(this.document1Service.create(document1));
    }
  }

  private createFromForm(): IDocument1 {
    return {
      ...new Document1(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      documentCategories: this.editForm.get(['documentCategories'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDocument1>>): void {
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

  trackById(index: number, item: IDocumentCategory1): any {
    return item.id;
  }

  getSelected(selectedVals: IDocumentCategory1[], option: IDocumentCategory1): IDocumentCategory1 {
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

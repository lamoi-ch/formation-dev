import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IDocument, Document } from 'app/shared/model/document.model';
import { DocumentService } from './document.service';
import { IDocumentCategory } from 'app/shared/model/document-category.model';
import { DocumentCategoryService } from 'app/entities/document-category/document-category.service';
import { IDocumentType } from 'app/shared/model/document-type.model';
import { DocumentTypeService } from 'app/entities/document-type/document-type.service';

type SelectableEntity = IDocumentCategory | IDocumentType;

@Component({
  selector: 'jhi-document-update',
  templateUrl: './document-update.component.html',
})
export class DocumentUpdateComponent implements OnInit {
  isSaving = false;
  documentcategories: IDocumentCategory[] = [];
  documenttypes: IDocumentType[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    description: [],
    url: [null, []],
    duration: [],
    creationDate: [],
    userCreation: [],
    downloadDate: [],
    userDownload: [],
    documentCategory: [null, Validators.required],
    documentType: [null, Validators.required],
  });

  constructor(
    protected documentService: DocumentService,
    protected documentCategoryService: DocumentCategoryService,
    protected documentTypeService: DocumentTypeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ document }) => {
      if (!document.id) {
        const today = moment().startOf('day');
        document.creationDate = today;
        document.downloadDate = today;
      }

      this.updateForm(document);

      this.documentCategoryService
        .query()
        .subscribe((res: HttpResponse<IDocumentCategory[]>) => (this.documentcategories = res.body || []));

      this.documentTypeService.query().subscribe((res: HttpResponse<IDocumentType[]>) => (this.documenttypes = res.body || []));
    });
  }

  updateForm(document: IDocument): void {
    this.editForm.patchValue({
      id: document.id,
      name: document.name,
      description: document.description,
      url: document.url,
      duration: document.duration,
      creationDate: document.creationDate ? document.creationDate.format(DATE_TIME_FORMAT) : null,
      userCreation: document.userCreation,
      downloadDate: document.downloadDate ? document.downloadDate.format(DATE_TIME_FORMAT) : null,
      userDownload: document.userDownload,
      documentCategory: document.documentCategory,
      documentType: document.documentType,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const document = this.createFromForm();
    if (document.id !== undefined) {
      this.subscribeToSaveResponse(this.documentService.update(document));
    } else {
      this.subscribeToSaveResponse(this.documentService.create(document));
    }
  }

  private createFromForm(): IDocument {
    return {
      ...new Document(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      url: this.editForm.get(['url'])!.value,
      duration: this.editForm.get(['duration'])!.value,
      creationDate: this.editForm.get(['creationDate'])!.value
        ? moment(this.editForm.get(['creationDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      userCreation: this.editForm.get(['userCreation'])!.value,
      downloadDate: this.editForm.get(['downloadDate'])!.value
        ? moment(this.editForm.get(['downloadDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      userDownload: this.editForm.get(['userDownload'])!.value,
      documentCategory: this.editForm.get(['documentCategory'])!.value,
      documentType: this.editForm.get(['documentType'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDocument>>): void {
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
}

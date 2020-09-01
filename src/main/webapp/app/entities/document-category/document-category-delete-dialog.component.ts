import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDocumentCategory } from 'app/shared/model/document-category.model';
import { DocumentCategoryService } from './document-category.service';

@Component({
  templateUrl: './document-category-delete-dialog.component.html',
})
export class DocumentCategoryDeleteDialogComponent {
  documentCategory?: IDocumentCategory;

  constructor(
    protected documentCategoryService: DocumentCategoryService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.documentCategoryService.delete(id).subscribe(() => {
      this.eventManager.broadcast('documentCategoryListModification');
      this.activeModal.close();
    });
  }
}

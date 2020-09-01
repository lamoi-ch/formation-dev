import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDocumentCategory1 } from 'app/shared/model/document-category-1.model';
import { DocumentCategory1Service } from './document-category-1.service';

@Component({
  templateUrl: './document-category-1-delete-dialog.component.html',
})
export class DocumentCategory1DeleteDialogComponent {
  documentCategory1?: IDocumentCategory1;

  constructor(
    protected documentCategory1Service: DocumentCategory1Service,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.documentCategory1Service.delete(id).subscribe(() => {
      this.eventManager.broadcast('documentCategory1ListModification');
      this.activeModal.close();
    });
  }
}

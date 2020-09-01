import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDocument1 } from 'app/shared/model/document-1.model';
import { Document1Service } from './document-1.service';

@Component({
  templateUrl: './document-1-delete-dialog.component.html',
})
export class Document1DeleteDialogComponent {
  document1?: IDocument1;

  constructor(protected document1Service: Document1Service, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.document1Service.delete(id).subscribe(() => {
      this.eventManager.broadcast('document1ListModification');
      this.activeModal.close();
    });
  }
}

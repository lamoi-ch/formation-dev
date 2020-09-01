import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProgramType } from 'app/shared/model/program-type.model';
import { ProgramTypeService } from './program-type.service';

@Component({
  templateUrl: './program-type-delete-dialog.component.html',
})
export class ProgramTypeDeleteDialogComponent {
  programType?: IProgramType;

  constructor(
    protected programTypeService: ProgramTypeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.programTypeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('programTypeListModification');
      this.activeModal.close();
    });
  }
}

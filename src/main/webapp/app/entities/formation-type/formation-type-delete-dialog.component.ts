import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFormationType } from 'app/shared/model/formation-type.model';
import { FormationTypeService } from './formation-type.service';

@Component({
  templateUrl: './formation-type-delete-dialog.component.html',
})
export class FormationTypeDeleteDialogComponent {
  formationType?: IFormationType;

  constructor(
    protected formationTypeService: FormationTypeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.formationTypeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('formationTypeListModification');
      this.activeModal.close();
    });
  }
}

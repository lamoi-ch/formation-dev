import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFormationProgram } from 'app/shared/model/formation-program.model';
import { FormationProgramService } from './formation-program.service';

@Component({
  templateUrl: './formation-program-delete-dialog.component.html',
})
export class FormationProgramDeleteDialogComponent {
  formationProgram?: IFormationProgram;

  constructor(
    protected formationProgramService: FormationProgramService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.formationProgramService.delete(id).subscribe(() => {
      this.eventManager.broadcast('formationProgramListModification');
      this.activeModal.close();
    });
  }
}

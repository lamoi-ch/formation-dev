import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFormationModule } from 'app/shared/model/formation-module.model';
import { FormationModuleService } from './formation-module.service';

@Component({
  templateUrl: './formation-module-delete-dialog.component.html',
})
export class FormationModuleDeleteDialogComponent {
  formationModule?: IFormationModule;

  constructor(
    protected formationModuleService: FormationModuleService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.formationModuleService.delete(id).subscribe(() => {
      this.eventManager.broadcast('formationModuleListModification');
      this.activeModal.close();
    });
  }
}

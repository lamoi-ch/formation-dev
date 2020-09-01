import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFormationProgram } from 'app/shared/model/formation-program.model';
import { FormationProgramService } from './formation-program.service';
import { FormationProgramDeleteDialogComponent } from './formation-program-delete-dialog.component';

@Component({
  selector: 'jhi-formation-program',
  templateUrl: './formation-program.component.html',
})
export class FormationProgramComponent implements OnInit, OnDestroy {
  formationPrograms?: IFormationProgram[];
  eventSubscriber?: Subscription;

  constructor(
    protected formationProgramService: FormationProgramService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.formationProgramService.query().subscribe((res: HttpResponse<IFormationProgram[]>) => (this.formationPrograms = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInFormationPrograms();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IFormationProgram): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInFormationPrograms(): void {
    this.eventSubscriber = this.eventManager.subscribe('formationProgramListModification', () => this.loadAll());
  }

  delete(formationProgram: IFormationProgram): void {
    const modalRef = this.modalService.open(FormationProgramDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.formationProgram = formationProgram;
  }
}

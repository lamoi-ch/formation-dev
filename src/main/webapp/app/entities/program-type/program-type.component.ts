import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProgramType } from 'app/shared/model/program-type.model';
import { ProgramTypeService } from './program-type.service';
import { ProgramTypeDeleteDialogComponent } from './program-type-delete-dialog.component';

@Component({
  selector: 'jhi-program-type',
  templateUrl: './program-type.component.html',
})
export class ProgramTypeComponent implements OnInit, OnDestroy {
  programTypes?: IProgramType[];
  eventSubscriber?: Subscription;

  constructor(
    protected programTypeService: ProgramTypeService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.programTypeService.query().subscribe((res: HttpResponse<IProgramType[]>) => (this.programTypes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProgramTypes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProgramType): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProgramTypes(): void {
    this.eventSubscriber = this.eventManager.subscribe('programTypeListModification', () => this.loadAll());
  }

  delete(programType: IProgramType): void {
    const modalRef = this.modalService.open(ProgramTypeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.programType = programType;
  }
}

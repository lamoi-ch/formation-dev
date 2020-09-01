import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFormationType } from 'app/shared/model/formation-type.model';
import { FormationTypeService } from './formation-type.service';
import { FormationTypeDeleteDialogComponent } from './formation-type-delete-dialog.component';

@Component({
  selector: 'jhi-formation-type',
  templateUrl: './formation-type.component.html',
})
export class FormationTypeComponent implements OnInit, OnDestroy {
  formationTypes?: IFormationType[];
  eventSubscriber?: Subscription;

  constructor(
    protected formationTypeService: FormationTypeService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.formationTypeService.query().subscribe((res: HttpResponse<IFormationType[]>) => (this.formationTypes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInFormationTypes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IFormationType): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInFormationTypes(): void {
    this.eventSubscriber = this.eventManager.subscribe('formationTypeListModification', () => this.loadAll());
  }

  delete(formationType: IFormationType): void {
    const modalRef = this.modalService.open(FormationTypeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.formationType = formationType;
  }
}

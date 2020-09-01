import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFormationModule } from 'app/shared/model/formation-module.model';
import { FormationModuleService } from './formation-module.service';
import { FormationModuleDeleteDialogComponent } from './formation-module-delete-dialog.component';

@Component({
  selector: 'jhi-formation-module',
  templateUrl: './formation-module.component.html',
})
export class FormationModuleComponent implements OnInit, OnDestroy {
  formationModules?: IFormationModule[];
  eventSubscriber?: Subscription;

  constructor(
    protected formationModuleService: FormationModuleService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.formationModuleService.query().subscribe((res: HttpResponse<IFormationModule[]>) => (this.formationModules = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInFormationModules();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IFormationModule): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInFormationModules(): void {
    this.eventSubscriber = this.eventManager.subscribe('formationModuleListModification', () => this.loadAll());
  }

  delete(formationModule: IFormationModule): void {
    const modalRef = this.modalService.open(FormationModuleDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.formationModule = formationModule;
  }
}

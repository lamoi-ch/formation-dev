import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDocument1 } from 'app/shared/model/document-1.model';
import { Document1Service } from './document-1.service';
import { Document1DeleteDialogComponent } from './document-1-delete-dialog.component';

@Component({
  selector: 'jhi-document-1',
  templateUrl: './document-1.component.html',
})
export class Document1Component implements OnInit, OnDestroy {
  document1s?: IDocument1[];
  eventSubscriber?: Subscription;

  constructor(protected document1Service: Document1Service, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.document1Service.query().subscribe((res: HttpResponse<IDocument1[]>) => (this.document1s = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDocument1s();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDocument1): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDocument1s(): void {
    this.eventSubscriber = this.eventManager.subscribe('document1ListModification', () => this.loadAll());
  }

  delete(document1: IDocument1): void {
    const modalRef = this.modalService.open(Document1DeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.document1 = document1;
  }
}

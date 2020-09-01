import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDocumentType } from 'app/shared/model/document-type.model';
import { DocumentTypeService } from './document-type.service';
import { DocumentTypeDeleteDialogComponent } from './document-type-delete-dialog.component';

@Component({
  selector: 'jhi-document-type',
  templateUrl: './document-type.component.html',
})
export class DocumentTypeComponent implements OnInit, OnDestroy {
  documentTypes?: IDocumentType[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected documentTypeService: DocumentTypeService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected activatedRoute: ActivatedRoute
  ) {
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.queryParams['search']
        ? this.activatedRoute.snapshot.queryParams['search']
        : '';
  }

  loadAll(): void {
    if (this.currentSearch) {
      this.documentTypeService
        .search({
          query: this.currentSearch,
        })
        .subscribe((res: HttpResponse<IDocumentType[]>) => (this.documentTypes = res.body || []));
      return;
    }

    this.documentTypeService.query().subscribe((res: HttpResponse<IDocumentType[]>) => (this.documentTypes = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDocumentTypes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDocumentType): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDocumentTypes(): void {
    this.eventSubscriber = this.eventManager.subscribe('documentTypeListModification', () => this.loadAll());
  }

  delete(documentType: IDocumentType): void {
    const modalRef = this.modalService.open(DocumentTypeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.documentType = documentType;
  }
}

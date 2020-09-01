import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDocumentCategory } from 'app/shared/model/document-category.model';
import { DocumentCategoryService } from './document-category.service';
import { DocumentCategoryDeleteDialogComponent } from './document-category-delete-dialog.component';

@Component({
  selector: 'jhi-document-category',
  templateUrl: './document-category.component.html',
})
export class DocumentCategoryComponent implements OnInit, OnDestroy {
  documentCategories?: IDocumentCategory[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected documentCategoryService: DocumentCategoryService,
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
      this.documentCategoryService
        .search({
          query: this.currentSearch,
        })
        .subscribe((res: HttpResponse<IDocumentCategory[]>) => (this.documentCategories = res.body || []));
      return;
    }

    this.documentCategoryService.query().subscribe((res: HttpResponse<IDocumentCategory[]>) => (this.documentCategories = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDocumentCategories();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDocumentCategory): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDocumentCategories(): void {
    this.eventSubscriber = this.eventManager.subscribe('documentCategoryListModification', () => this.loadAll());
  }

  delete(documentCategory: IDocumentCategory): void {
    const modalRef = this.modalService.open(DocumentCategoryDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.documentCategory = documentCategory;
  }
}

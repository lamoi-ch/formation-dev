import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IUserCategory } from 'app/shared/model/user-category.model';
import { UserCategoryService } from './user-category.service';
import { UserCategoryDeleteDialogComponent } from './user-category-delete-dialog.component';

@Component({
  selector: 'jhi-user-category',
  templateUrl: './user-category.component.html',
})
export class UserCategoryComponent implements OnInit, OnDestroy {
  userCategories?: IUserCategory[];
  eventSubscriber?: Subscription;

  constructor(
    protected userCategoryService: UserCategoryService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.userCategoryService.query().subscribe((res: HttpResponse<IUserCategory[]>) => (this.userCategories = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInUserCategories();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IUserCategory): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInUserCategories(): void {
    this.eventSubscriber = this.eventManager.subscribe('userCategoryListModification', () => this.loadAll());
  }

  delete(userCategory: IUserCategory): void {
    const modalRef = this.modalService.open(UserCategoryDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.userCategory = userCategory;
  }
}

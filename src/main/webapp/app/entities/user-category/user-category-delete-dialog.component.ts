import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUserCategory } from 'app/shared/model/user-category.model';
import { UserCategoryService } from './user-category.service';

@Component({
  templateUrl: './user-category-delete-dialog.component.html',
})
export class UserCategoryDeleteDialogComponent {
  userCategory?: IUserCategory;

  constructor(
    protected userCategoryService: UserCategoryService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.userCategoryService.delete(id).subscribe(() => {
      this.eventManager.broadcast('userCategoryListModification');
      this.activeModal.close();
    });
  }
}

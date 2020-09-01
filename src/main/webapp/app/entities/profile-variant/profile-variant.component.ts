import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProfileVariant } from 'app/shared/model/profile-variant.model';
import { ProfileVariantService } from './profile-variant.service';
import { ProfileVariantDeleteDialogComponent } from './profile-variant-delete-dialog.component';

@Component({
  selector: 'jhi-profile-variant',
  templateUrl: './profile-variant.component.html',
})
export class ProfileVariantComponent implements OnInit, OnDestroy {
  profileVariants?: IProfileVariant[];
  eventSubscriber?: Subscription;

  constructor(
    protected profileVariantService: ProfileVariantService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.profileVariantService.query().subscribe((res: HttpResponse<IProfileVariant[]>) => (this.profileVariants = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProfileVariants();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProfileVariant): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProfileVariants(): void {
    this.eventSubscriber = this.eventManager.subscribe('profileVariantListModification', () => this.loadAll());
  }

  delete(profileVariant: IProfileVariant): void {
    const modalRef = this.modalService.open(ProfileVariantDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.profileVariant = profileVariant;
  }
}

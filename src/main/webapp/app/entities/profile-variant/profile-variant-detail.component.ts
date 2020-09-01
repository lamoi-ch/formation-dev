import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProfileVariant } from 'app/shared/model/profile-variant.model';

@Component({
  selector: 'jhi-profile-variant-detail',
  templateUrl: './profile-variant-detail.component.html',
})
export class ProfileVariantDetailComponent implements OnInit {
  profileVariant: IProfileVariant | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ profileVariant }) => (this.profileVariant = profileVariant));
  }

  previousState(): void {
    window.history.back();
  }
}

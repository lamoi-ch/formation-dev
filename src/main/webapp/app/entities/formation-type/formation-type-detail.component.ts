import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFormationType } from 'app/shared/model/formation-type.model';

@Component({
  selector: 'jhi-formation-type-detail',
  templateUrl: './formation-type-detail.component.html',
})
export class FormationTypeDetailComponent implements OnInit {
  formationType: IFormationType | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ formationType }) => (this.formationType = formationType));
  }

  previousState(): void {
    window.history.back();
  }
}

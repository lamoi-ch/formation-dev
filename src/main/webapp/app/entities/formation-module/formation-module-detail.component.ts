import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFormationModule } from 'app/shared/model/formation-module.model';

@Component({
  selector: 'jhi-formation-module-detail',
  templateUrl: './formation-module-detail.component.html',
})
export class FormationModuleDetailComponent implements OnInit {
  formationModule: IFormationModule | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ formationModule }) => (this.formationModule = formationModule));
  }

  previousState(): void {
    window.history.back();
  }
}

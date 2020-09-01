import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFormationProgram } from 'app/shared/model/formation-program.model';

@Component({
  selector: 'jhi-formation-program-detail',
  templateUrl: './formation-program-detail.component.html',
})
export class FormationProgramDetailComponent implements OnInit {
  formationProgram: IFormationProgram | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ formationProgram }) => (this.formationProgram = formationProgram));
  }

  previousState(): void {
    window.history.back();
  }
}

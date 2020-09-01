import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProgramType } from 'app/shared/model/program-type.model';

@Component({
  selector: 'jhi-program-type-detail',
  templateUrl: './program-type-detail.component.html',
})
export class ProgramTypeDetailComponent implements OnInit {
  programType: IProgramType | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ programType }) => (this.programType = programType));
  }

  previousState(): void {
    window.history.back();
  }
}

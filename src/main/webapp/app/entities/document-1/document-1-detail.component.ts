import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDocument1 } from 'app/shared/model/document-1.model';

@Component({
  selector: 'jhi-document-1-detail',
  templateUrl: './document-1-detail.component.html',
})
export class Document1DetailComponent implements OnInit {
  document1: IDocument1 | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ document1 }) => (this.document1 = document1));
  }

  previousState(): void {
    window.history.back();
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDocumentCategory1 } from 'app/shared/model/document-category-1.model';

@Component({
  selector: 'jhi-document-category-1-detail',
  templateUrl: './document-category-1-detail.component.html',
})
export class DocumentCategory1DetailComponent implements OnInit {
  documentCategory1: IDocumentCategory1 | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ documentCategory1 }) => (this.documentCategory1 = documentCategory1));
  }

  previousState(): void {
    window.history.back();
  }
}

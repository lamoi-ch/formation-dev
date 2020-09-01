import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDocumentCategory } from 'app/shared/model/document-category.model';

@Component({
  selector: 'jhi-document-category-detail',
  templateUrl: './document-category-detail.component.html',
})
export class DocumentCategoryDetailComponent implements OnInit {
  documentCategory: IDocumentCategory | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ documentCategory }) => (this.documentCategory = documentCategory));
  }

  previousState(): void {
    window.history.back();
  }
}

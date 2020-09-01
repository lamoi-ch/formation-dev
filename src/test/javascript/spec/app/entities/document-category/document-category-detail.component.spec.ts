import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { KomportementalistTestModule } from '../../../test.module';
import { DocumentCategoryDetailComponent } from 'app/entities/document-category/document-category-detail.component';
import { DocumentCategory } from 'app/shared/model/document-category.model';

describe('Component Tests', () => {
  describe('DocumentCategory Management Detail Component', () => {
    let comp: DocumentCategoryDetailComponent;
    let fixture: ComponentFixture<DocumentCategoryDetailComponent>;
    const route = ({ data: of({ documentCategory: new DocumentCategory(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KomportementalistTestModule],
        declarations: [DocumentCategoryDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(DocumentCategoryDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DocumentCategoryDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load documentCategory on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.documentCategory).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

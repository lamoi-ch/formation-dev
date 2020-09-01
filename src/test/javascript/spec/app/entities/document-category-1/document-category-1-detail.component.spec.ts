import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { KomportementalistTestModule } from '../../../test.module';
import { DocumentCategory1DetailComponent } from 'app/entities/document-category-1/document-category-1-detail.component';
import { DocumentCategory1 } from 'app/shared/model/document-category-1.model';

describe('Component Tests', () => {
  describe('DocumentCategory1 Management Detail Component', () => {
    let comp: DocumentCategory1DetailComponent;
    let fixture: ComponentFixture<DocumentCategory1DetailComponent>;
    const route = ({ data: of({ documentCategory1: new DocumentCategory1(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KomportementalistTestModule],
        declarations: [DocumentCategory1DetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(DocumentCategory1DetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DocumentCategory1DetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load documentCategory1 on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.documentCategory1).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

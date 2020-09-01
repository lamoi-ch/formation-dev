import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { KomportementalistTestModule } from '../../../test.module';
import { Document1DetailComponent } from 'app/entities/document-1/document-1-detail.component';
import { Document1 } from 'app/shared/model/document-1.model';

describe('Component Tests', () => {
  describe('Document1 Management Detail Component', () => {
    let comp: Document1DetailComponent;
    let fixture: ComponentFixture<Document1DetailComponent>;
    const route = ({ data: of({ document1: new Document1(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KomportementalistTestModule],
        declarations: [Document1DetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(Document1DetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(Document1DetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load document1 on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.document1).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

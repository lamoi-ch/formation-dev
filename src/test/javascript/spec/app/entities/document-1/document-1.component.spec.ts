import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { KomportementalistTestModule } from '../../../test.module';
import { Document1Component } from 'app/entities/document-1/document-1.component';
import { Document1Service } from 'app/entities/document-1/document-1.service';
import { Document1 } from 'app/shared/model/document-1.model';

describe('Component Tests', () => {
  describe('Document1 Management Component', () => {
    let comp: Document1Component;
    let fixture: ComponentFixture<Document1Component>;
    let service: Document1Service;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KomportementalistTestModule],
        declarations: [Document1Component],
      })
        .overrideTemplate(Document1Component, '')
        .compileComponents();

      fixture = TestBed.createComponent(Document1Component);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(Document1Service);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Document1(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.document1s && comp.document1s[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

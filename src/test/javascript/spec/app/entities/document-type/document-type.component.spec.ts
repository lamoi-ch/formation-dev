import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { KomportementalistTestModule } from '../../../test.module';
import { DocumentTypeComponent } from 'app/entities/document-type/document-type.component';
import { DocumentTypeService } from 'app/entities/document-type/document-type.service';
import { DocumentType } from 'app/shared/model/document-type.model';

describe('Component Tests', () => {
  describe('DocumentType Management Component', () => {
    let comp: DocumentTypeComponent;
    let fixture: ComponentFixture<DocumentTypeComponent>;
    let service: DocumentTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KomportementalistTestModule],
        declarations: [DocumentTypeComponent],
      })
        .overrideTemplate(DocumentTypeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DocumentTypeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DocumentTypeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new DocumentType(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.documentTypes && comp.documentTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

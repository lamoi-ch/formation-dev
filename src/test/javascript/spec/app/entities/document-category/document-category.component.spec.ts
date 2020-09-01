import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { KomportementalistTestModule } from '../../../test.module';
import { DocumentCategoryComponent } from 'app/entities/document-category/document-category.component';
import { DocumentCategoryService } from 'app/entities/document-category/document-category.service';
import { DocumentCategory } from 'app/shared/model/document-category.model';

describe('Component Tests', () => {
  describe('DocumentCategory Management Component', () => {
    let comp: DocumentCategoryComponent;
    let fixture: ComponentFixture<DocumentCategoryComponent>;
    let service: DocumentCategoryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KomportementalistTestModule],
        declarations: [DocumentCategoryComponent],
      })
        .overrideTemplate(DocumentCategoryComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DocumentCategoryComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DocumentCategoryService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new DocumentCategory(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.documentCategories && comp.documentCategories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

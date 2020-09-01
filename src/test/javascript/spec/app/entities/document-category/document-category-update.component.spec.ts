import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { KomportementalistTestModule } from '../../../test.module';
import { DocumentCategoryUpdateComponent } from 'app/entities/document-category/document-category-update.component';
import { DocumentCategoryService } from 'app/entities/document-category/document-category.service';
import { DocumentCategory } from 'app/shared/model/document-category.model';

describe('Component Tests', () => {
  describe('DocumentCategory Management Update Component', () => {
    let comp: DocumentCategoryUpdateComponent;
    let fixture: ComponentFixture<DocumentCategoryUpdateComponent>;
    let service: DocumentCategoryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KomportementalistTestModule],
        declarations: [DocumentCategoryUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(DocumentCategoryUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DocumentCategoryUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DocumentCategoryService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DocumentCategory(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new DocumentCategory();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});

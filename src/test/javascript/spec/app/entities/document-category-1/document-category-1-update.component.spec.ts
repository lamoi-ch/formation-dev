import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { KomportementalistTestModule } from '../../../test.module';
import { DocumentCategory1UpdateComponent } from 'app/entities/document-category-1/document-category-1-update.component';
import { DocumentCategory1Service } from 'app/entities/document-category-1/document-category-1.service';
import { DocumentCategory1 } from 'app/shared/model/document-category-1.model';

describe('Component Tests', () => {
  describe('DocumentCategory1 Management Update Component', () => {
    let comp: DocumentCategory1UpdateComponent;
    let fixture: ComponentFixture<DocumentCategory1UpdateComponent>;
    let service: DocumentCategory1Service;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KomportementalistTestModule],
        declarations: [DocumentCategory1UpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(DocumentCategory1UpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DocumentCategory1UpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DocumentCategory1Service);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DocumentCategory1(123);
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
        const entity = new DocumentCategory1();
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

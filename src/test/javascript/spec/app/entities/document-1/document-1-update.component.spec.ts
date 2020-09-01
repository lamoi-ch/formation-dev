import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { KomportementalistTestModule } from '../../../test.module';
import { Document1UpdateComponent } from 'app/entities/document-1/document-1-update.component';
import { Document1Service } from 'app/entities/document-1/document-1.service';
import { Document1 } from 'app/shared/model/document-1.model';

describe('Component Tests', () => {
  describe('Document1 Management Update Component', () => {
    let comp: Document1UpdateComponent;
    let fixture: ComponentFixture<Document1UpdateComponent>;
    let service: Document1Service;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KomportementalistTestModule],
        declarations: [Document1UpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(Document1UpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(Document1UpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(Document1Service);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Document1(123);
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
        const entity = new Document1();
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

import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { KomportementalistTestModule } from '../../../test.module';
import { FormationTypeUpdateComponent } from 'app/entities/formation-type/formation-type-update.component';
import { FormationTypeService } from 'app/entities/formation-type/formation-type.service';
import { FormationType } from 'app/shared/model/formation-type.model';

describe('Component Tests', () => {
  describe('FormationType Management Update Component', () => {
    let comp: FormationTypeUpdateComponent;
    let fixture: ComponentFixture<FormationTypeUpdateComponent>;
    let service: FormationTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KomportementalistTestModule],
        declarations: [FormationTypeUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(FormationTypeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FormationTypeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FormationTypeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new FormationType(123);
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
        const entity = new FormationType();
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

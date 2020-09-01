import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { KomportementalistTestModule } from '../../../test.module';
import { ProgramTypeUpdateComponent } from 'app/entities/program-type/program-type-update.component';
import { ProgramTypeService } from 'app/entities/program-type/program-type.service';
import { ProgramType } from 'app/shared/model/program-type.model';

describe('Component Tests', () => {
  describe('ProgramType Management Update Component', () => {
    let comp: ProgramTypeUpdateComponent;
    let fixture: ComponentFixture<ProgramTypeUpdateComponent>;
    let service: ProgramTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KomportementalistTestModule],
        declarations: [ProgramTypeUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ProgramTypeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProgramTypeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProgramTypeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProgramType(123);
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
        const entity = new ProgramType();
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

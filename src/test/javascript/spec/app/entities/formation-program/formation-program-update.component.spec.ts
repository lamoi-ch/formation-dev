import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { KomportementalistTestModule } from '../../../test.module';
import { FormationProgramUpdateComponent } from 'app/entities/formation-program/formation-program-update.component';
import { FormationProgramService } from 'app/entities/formation-program/formation-program.service';
import { FormationProgram } from 'app/shared/model/formation-program.model';

describe('Component Tests', () => {
  describe('FormationProgram Management Update Component', () => {
    let comp: FormationProgramUpdateComponent;
    let fixture: ComponentFixture<FormationProgramUpdateComponent>;
    let service: FormationProgramService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KomportementalistTestModule],
        declarations: [FormationProgramUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(FormationProgramUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FormationProgramUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FormationProgramService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new FormationProgram(123);
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
        const entity = new FormationProgram();
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

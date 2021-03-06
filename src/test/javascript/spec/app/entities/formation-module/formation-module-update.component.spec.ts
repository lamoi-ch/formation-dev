import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { KomportementalistTestModule } from '../../../test.module';
import { FormationModuleUpdateComponent } from 'app/entities/formation-module/formation-module-update.component';
import { FormationModuleService } from 'app/entities/formation-module/formation-module.service';
import { FormationModule } from 'app/shared/model/formation-module.model';

describe('Component Tests', () => {
  describe('FormationModule Management Update Component', () => {
    let comp: FormationModuleUpdateComponent;
    let fixture: ComponentFixture<FormationModuleUpdateComponent>;
    let service: FormationModuleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KomportementalistTestModule],
        declarations: [FormationModuleUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(FormationModuleUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FormationModuleUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FormationModuleService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new FormationModule(123);
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
        const entity = new FormationModule();
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

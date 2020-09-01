import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { KomportementalistTestModule } from '../../../test.module';
import { ProfileVariantUpdateComponent } from 'app/entities/profile-variant/profile-variant-update.component';
import { ProfileVariantService } from 'app/entities/profile-variant/profile-variant.service';
import { ProfileVariant } from 'app/shared/model/profile-variant.model';

describe('Component Tests', () => {
  describe('ProfileVariant Management Update Component', () => {
    let comp: ProfileVariantUpdateComponent;
    let fixture: ComponentFixture<ProfileVariantUpdateComponent>;
    let service: ProfileVariantService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KomportementalistTestModule],
        declarations: [ProfileVariantUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ProfileVariantUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProfileVariantUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProfileVariantService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProfileVariant(123);
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
        const entity = new ProfileVariant();
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

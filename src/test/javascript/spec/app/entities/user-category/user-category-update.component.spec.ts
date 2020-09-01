import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { KomportementalistTestModule } from '../../../test.module';
import { UserCategoryUpdateComponent } from 'app/entities/user-category/user-category-update.component';
import { UserCategoryService } from 'app/entities/user-category/user-category.service';
import { UserCategory } from 'app/shared/model/user-category.model';

describe('Component Tests', () => {
  describe('UserCategory Management Update Component', () => {
    let comp: UserCategoryUpdateComponent;
    let fixture: ComponentFixture<UserCategoryUpdateComponent>;
    let service: UserCategoryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KomportementalistTestModule],
        declarations: [UserCategoryUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(UserCategoryUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserCategoryUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserCategoryService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new UserCategory(123);
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
        const entity = new UserCategory();
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

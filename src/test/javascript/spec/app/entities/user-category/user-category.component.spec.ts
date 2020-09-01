import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { KomportementalistTestModule } from '../../../test.module';
import { UserCategoryComponent } from 'app/entities/user-category/user-category.component';
import { UserCategoryService } from 'app/entities/user-category/user-category.service';
import { UserCategory } from 'app/shared/model/user-category.model';

describe('Component Tests', () => {
  describe('UserCategory Management Component', () => {
    let comp: UserCategoryComponent;
    let fixture: ComponentFixture<UserCategoryComponent>;
    let service: UserCategoryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KomportementalistTestModule],
        declarations: [UserCategoryComponent],
      })
        .overrideTemplate(UserCategoryComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserCategoryComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserCategoryService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new UserCategory(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.userCategories && comp.userCategories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

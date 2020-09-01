import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { KomportementalistTestModule } from '../../../test.module';
import { UserCategoryDetailComponent } from 'app/entities/user-category/user-category-detail.component';
import { UserCategory } from 'app/shared/model/user-category.model';

describe('Component Tests', () => {
  describe('UserCategory Management Detail Component', () => {
    let comp: UserCategoryDetailComponent;
    let fixture: ComponentFixture<UserCategoryDetailComponent>;
    const route = ({ data: of({ userCategory: new UserCategory(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KomportementalistTestModule],
        declarations: [UserCategoryDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(UserCategoryDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UserCategoryDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load userCategory on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.userCategory).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

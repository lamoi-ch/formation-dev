import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { KomportementalistTestModule } from '../../../test.module';
import { ProfileVariantDetailComponent } from 'app/entities/profile-variant/profile-variant-detail.component';
import { ProfileVariant } from 'app/shared/model/profile-variant.model';

describe('Component Tests', () => {
  describe('ProfileVariant Management Detail Component', () => {
    let comp: ProfileVariantDetailComponent;
    let fixture: ComponentFixture<ProfileVariantDetailComponent>;
    const route = ({ data: of({ profileVariant: new ProfileVariant(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KomportementalistTestModule],
        declarations: [ProfileVariantDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ProfileVariantDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProfileVariantDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load profileVariant on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.profileVariant).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

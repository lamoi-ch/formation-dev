import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { KomportementalistTestModule } from '../../../test.module';
import { ProfileVariantComponent } from 'app/entities/profile-variant/profile-variant.component';
import { ProfileVariantService } from 'app/entities/profile-variant/profile-variant.service';
import { ProfileVariant } from 'app/shared/model/profile-variant.model';

describe('Component Tests', () => {
  describe('ProfileVariant Management Component', () => {
    let comp: ProfileVariantComponent;
    let fixture: ComponentFixture<ProfileVariantComponent>;
    let service: ProfileVariantService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KomportementalistTestModule],
        declarations: [ProfileVariantComponent],
      })
        .overrideTemplate(ProfileVariantComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProfileVariantComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProfileVariantService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ProfileVariant(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.profileVariants && comp.profileVariants[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

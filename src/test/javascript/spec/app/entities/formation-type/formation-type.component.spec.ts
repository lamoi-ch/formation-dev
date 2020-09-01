import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { KomportementalistTestModule } from '../../../test.module';
import { FormationTypeComponent } from 'app/entities/formation-type/formation-type.component';
import { FormationTypeService } from 'app/entities/formation-type/formation-type.service';
import { FormationType } from 'app/shared/model/formation-type.model';

describe('Component Tests', () => {
  describe('FormationType Management Component', () => {
    let comp: FormationTypeComponent;
    let fixture: ComponentFixture<FormationTypeComponent>;
    let service: FormationTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KomportementalistTestModule],
        declarations: [FormationTypeComponent],
      })
        .overrideTemplate(FormationTypeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FormationTypeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FormationTypeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new FormationType(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.formationTypes && comp.formationTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

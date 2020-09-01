import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { KomportementalistTestModule } from '../../../test.module';
import { FormationModuleComponent } from 'app/entities/formation-module/formation-module.component';
import { FormationModuleService } from 'app/entities/formation-module/formation-module.service';
import { FormationModule } from 'app/shared/model/formation-module.model';

describe('Component Tests', () => {
  describe('FormationModule Management Component', () => {
    let comp: FormationModuleComponent;
    let fixture: ComponentFixture<FormationModuleComponent>;
    let service: FormationModuleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KomportementalistTestModule],
        declarations: [FormationModuleComponent],
      })
        .overrideTemplate(FormationModuleComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FormationModuleComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FormationModuleService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new FormationModule(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.formationModules && comp.formationModules[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

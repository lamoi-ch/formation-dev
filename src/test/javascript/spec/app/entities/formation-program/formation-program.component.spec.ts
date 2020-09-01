import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { KomportementalistTestModule } from '../../../test.module';
import { FormationProgramComponent } from 'app/entities/formation-program/formation-program.component';
import { FormationProgramService } from 'app/entities/formation-program/formation-program.service';
import { FormationProgram } from 'app/shared/model/formation-program.model';

describe('Component Tests', () => {
  describe('FormationProgram Management Component', () => {
    let comp: FormationProgramComponent;
    let fixture: ComponentFixture<FormationProgramComponent>;
    let service: FormationProgramService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KomportementalistTestModule],
        declarations: [FormationProgramComponent],
      })
        .overrideTemplate(FormationProgramComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FormationProgramComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FormationProgramService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new FormationProgram(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.formationPrograms && comp.formationPrograms[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

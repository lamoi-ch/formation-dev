import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { KomportementalistTestModule } from '../../../test.module';
import { ProgramTypeComponent } from 'app/entities/program-type/program-type.component';
import { ProgramTypeService } from 'app/entities/program-type/program-type.service';
import { ProgramType } from 'app/shared/model/program-type.model';

describe('Component Tests', () => {
  describe('ProgramType Management Component', () => {
    let comp: ProgramTypeComponent;
    let fixture: ComponentFixture<ProgramTypeComponent>;
    let service: ProgramTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KomportementalistTestModule],
        declarations: [ProgramTypeComponent],
      })
        .overrideTemplate(ProgramTypeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProgramTypeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProgramTypeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ProgramType(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.programTypes && comp.programTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

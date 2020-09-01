import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { KomportementalistTestModule } from '../../../test.module';
import { ProgramTypeDetailComponent } from 'app/entities/program-type/program-type-detail.component';
import { ProgramType } from 'app/shared/model/program-type.model';

describe('Component Tests', () => {
  describe('ProgramType Management Detail Component', () => {
    let comp: ProgramTypeDetailComponent;
    let fixture: ComponentFixture<ProgramTypeDetailComponent>;
    const route = ({ data: of({ programType: new ProgramType(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KomportementalistTestModule],
        declarations: [ProgramTypeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ProgramTypeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProgramTypeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load programType on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.programType).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

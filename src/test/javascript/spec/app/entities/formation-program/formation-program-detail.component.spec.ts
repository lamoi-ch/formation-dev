import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { KomportementalistTestModule } from '../../../test.module';
import { FormationProgramDetailComponent } from 'app/entities/formation-program/formation-program-detail.component';
import { FormationProgram } from 'app/shared/model/formation-program.model';

describe('Component Tests', () => {
  describe('FormationProgram Management Detail Component', () => {
    let comp: FormationProgramDetailComponent;
    let fixture: ComponentFixture<FormationProgramDetailComponent>;
    const route = ({ data: of({ formationProgram: new FormationProgram(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KomportementalistTestModule],
        declarations: [FormationProgramDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(FormationProgramDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FormationProgramDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load formationProgram on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.formationProgram).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

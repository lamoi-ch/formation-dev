import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { KomportementalistTestModule } from '../../../test.module';
import { FormationModuleDetailComponent } from 'app/entities/formation-module/formation-module-detail.component';
import { FormationModule } from 'app/shared/model/formation-module.model';

describe('Component Tests', () => {
  describe('FormationModule Management Detail Component', () => {
    let comp: FormationModuleDetailComponent;
    let fixture: ComponentFixture<FormationModuleDetailComponent>;
    const route = ({ data: of({ formationModule: new FormationModule(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KomportementalistTestModule],
        declarations: [FormationModuleDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(FormationModuleDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FormationModuleDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load formationModule on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.formationModule).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

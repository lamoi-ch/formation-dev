import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { KomportementalistTestModule } from '../../../test.module';
import { FormationTypeDetailComponent } from 'app/entities/formation-type/formation-type-detail.component';
import { FormationType } from 'app/shared/model/formation-type.model';

describe('Component Tests', () => {
  describe('FormationType Management Detail Component', () => {
    let comp: FormationTypeDetailComponent;
    let fixture: ComponentFixture<FormationTypeDetailComponent>;
    const route = ({ data: of({ formationType: new FormationType(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KomportementalistTestModule],
        declarations: [FormationTypeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(FormationTypeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FormationTypeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load formationType on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.formationType).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

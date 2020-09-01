import { IFormationType } from 'app/shared/model/formation-type.model';
import { IFormationProgram } from 'app/shared/model/formation-program.model';

export interface IFormationModule {
  id?: number;
  code?: string;
  name?: string;
  description?: string;
  formationTypes?: IFormationType[];
  formationPrograms?: IFormationProgram[];
}

export class FormationModule implements IFormationModule {
  constructor(
    public id?: number,
    public code?: string,
    public name?: string,
    public description?: string,
    public formationTypes?: IFormationType[],
    public formationPrograms?: IFormationProgram[]
  ) {}
}

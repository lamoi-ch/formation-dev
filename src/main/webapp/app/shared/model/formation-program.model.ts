import { IUserCategory } from 'app/shared/model/user-category.model';
import { IProgramType } from 'app/shared/model/program-type.model';
import { IProfileVariant } from 'app/shared/model/profile-variant.model';
import { IFormationModule } from 'app/shared/model/formation-module.model';

export interface IFormationProgram {
  id?: number;
  name?: string;
  description?: string;
  userCategories?: IUserCategory;
  programType?: IProgramType;
  profileVariant?: IProfileVariant;
  formationModules?: IFormationModule[];
}

export class FormationProgram implements IFormationProgram {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public userCategories?: IUserCategory,
    public programType?: IProgramType,
    public profileVariant?: IProfileVariant,
    public formationModules?: IFormationModule[]
  ) {}
}

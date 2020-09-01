import { IDocumentType } from 'app/shared/model/document-type.model';
import { IDocument } from 'app/shared/model/document.model';
import { IFormationModule } from 'app/shared/model/formation-module.model';

export interface IFormationType {
  id?: number;
  description?: string;
  duration?: number;
  documentType?: IDocumentType;
  documents?: IDocument[];
  formationModules?: IFormationModule[];
}

export class FormationType implements IFormationType {
  constructor(
    public id?: number,
    public description?: string,
    public duration?: number,
    public documentType?: IDocumentType,
    public documents?: IDocument[],
    public formationModules?: IFormationModule[]
  ) {}
}

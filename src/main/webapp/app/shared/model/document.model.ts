import { Moment } from 'moment';
import { IDocumentCategory } from 'app/shared/model/document-category.model';
import { IDocumentType } from 'app/shared/model/document-type.model';

export interface IDocument {
  id?: number;
  name?: string;
  description?: string;
  url?: string;
  duration?: number;
  creationDate?: Moment;
  userCreation?: string;
  downloadDate?: Moment;
  userDownload?: string;
  documentCategory?: IDocumentCategory;
  documentType?: IDocumentType;
}

export class Document implements IDocument {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public url?: string,
    public duration?: number,
    public creationDate?: Moment,
    public userCreation?: string,
    public downloadDate?: Moment,
    public userDownload?: string,
    public documentCategory?: IDocumentCategory,
    public documentType?: IDocumentType
  ) {}
}

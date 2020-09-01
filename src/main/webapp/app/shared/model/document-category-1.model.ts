import { IDocument1 } from 'app/shared/model/document-1.model';

export interface IDocumentCategory1 {
  id?: number;
  name?: string;
  description?: string;
  documents?: IDocument1[];
}

export class DocumentCategory1 implements IDocumentCategory1 {
  constructor(public id?: number, public name?: string, public description?: string, public documents?: IDocument1[]) {}
}

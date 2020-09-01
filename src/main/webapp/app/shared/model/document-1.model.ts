import { IDocumentCategory1 } from 'app/shared/model/document-category-1.model';

export interface IDocument1 {
  id?: number;
  name?: string;
  documentCategories?: IDocumentCategory1[];
}

export class Document1 implements IDocument1 {
  constructor(public id?: number, public name?: string, public documentCategories?: IDocumentCategory1[]) {}
}

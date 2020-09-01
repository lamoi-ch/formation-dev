export interface IDocumentCategory {
  id?: number;
  name?: string;
  description?: string;
}

export class DocumentCategory implements IDocumentCategory {
  constructor(public id?: number, public name?: string, public description?: string) {}
}

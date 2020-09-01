import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, Search } from 'app/shared/util/request-util';
import { IDocumentCategory } from 'app/shared/model/document-category.model';

type EntityResponseType = HttpResponse<IDocumentCategory>;
type EntityArrayResponseType = HttpResponse<IDocumentCategory[]>;

@Injectable({ providedIn: 'root' })
export class DocumentCategoryService {
  public resourceUrl = SERVER_API_URL + 'api/document-categories';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/document-categories';

  constructor(protected http: HttpClient) {}

  create(documentCategory: IDocumentCategory): Observable<EntityResponseType> {
    return this.http.post<IDocumentCategory>(this.resourceUrl, documentCategory, { observe: 'response' });
  }

  update(documentCategory: IDocumentCategory): Observable<EntityResponseType> {
    return this.http.put<IDocumentCategory>(this.resourceUrl, documentCategory, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDocumentCategory>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDocumentCategory[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDocumentCategory[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}

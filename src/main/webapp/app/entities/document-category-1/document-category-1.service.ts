import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, SearchWithPagination } from 'app/shared/util/request-util';
import { IDocumentCategory1 } from 'app/shared/model/document-category-1.model';

type EntityResponseType = HttpResponse<IDocumentCategory1>;
type EntityArrayResponseType = HttpResponse<IDocumentCategory1[]>;

@Injectable({ providedIn: 'root' })
export class DocumentCategory1Service {
  public resourceUrl = SERVER_API_URL + 'api/document-category-1-s';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/document-category-1-s';

  constructor(protected http: HttpClient) {}

  create(documentCategory1: IDocumentCategory1): Observable<EntityResponseType> {
    return this.http.post<IDocumentCategory1>(this.resourceUrl, documentCategory1, { observe: 'response' });
  }

  update(documentCategory1: IDocumentCategory1): Observable<EntityResponseType> {
    return this.http.put<IDocumentCategory1>(this.resourceUrl, documentCategory1, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDocumentCategory1>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDocumentCategory1[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDocumentCategory1[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}

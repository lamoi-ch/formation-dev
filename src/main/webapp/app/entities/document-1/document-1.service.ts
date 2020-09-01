import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDocument1 } from 'app/shared/model/document-1.model';

type EntityResponseType = HttpResponse<IDocument1>;
type EntityArrayResponseType = HttpResponse<IDocument1[]>;

@Injectable({ providedIn: 'root' })
export class Document1Service {
  public resourceUrl = SERVER_API_URL + 'api/document-1-s';

  constructor(protected http: HttpClient) {}

  create(document1: IDocument1): Observable<EntityResponseType> {
    return this.http.post<IDocument1>(this.resourceUrl, document1, { observe: 'response' });
  }

  update(document1: IDocument1): Observable<EntityResponseType> {
    return this.http.put<IDocument1>(this.resourceUrl, document1, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDocument1>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDocument1[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IFormationType } from 'app/shared/model/formation-type.model';

type EntityResponseType = HttpResponse<IFormationType>;
type EntityArrayResponseType = HttpResponse<IFormationType[]>;

@Injectable({ providedIn: 'root' })
export class FormationTypeService {
  public resourceUrl = SERVER_API_URL + 'api/formation-types';

  constructor(protected http: HttpClient) {}

  create(formationType: IFormationType): Observable<EntityResponseType> {
    return this.http.post<IFormationType>(this.resourceUrl, formationType, { observe: 'response' });
  }

  update(formationType: IFormationType): Observable<EntityResponseType> {
    return this.http.put<IFormationType>(this.resourceUrl, formationType, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFormationType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFormationType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

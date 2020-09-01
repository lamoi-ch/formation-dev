import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProgramType } from 'app/shared/model/program-type.model';

type EntityResponseType = HttpResponse<IProgramType>;
type EntityArrayResponseType = HttpResponse<IProgramType[]>;

@Injectable({ providedIn: 'root' })
export class ProgramTypeService {
  public resourceUrl = SERVER_API_URL + 'api/program-types';

  constructor(protected http: HttpClient) {}

  create(programType: IProgramType): Observable<EntityResponseType> {
    return this.http.post<IProgramType>(this.resourceUrl, programType, { observe: 'response' });
  }

  update(programType: IProgramType): Observable<EntityResponseType> {
    return this.http.put<IProgramType>(this.resourceUrl, programType, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProgramType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProgramType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

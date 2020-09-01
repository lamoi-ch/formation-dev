import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IFormationProgram } from 'app/shared/model/formation-program.model';

type EntityResponseType = HttpResponse<IFormationProgram>;
type EntityArrayResponseType = HttpResponse<IFormationProgram[]>;

@Injectable({ providedIn: 'root' })
export class FormationProgramService {
  public resourceUrl = SERVER_API_URL + 'api/formation-programs';

  constructor(protected http: HttpClient) {}

  create(formationProgram: IFormationProgram): Observable<EntityResponseType> {
    return this.http.post<IFormationProgram>(this.resourceUrl, formationProgram, { observe: 'response' });
  }

  update(formationProgram: IFormationProgram): Observable<EntityResponseType> {
    return this.http.put<IFormationProgram>(this.resourceUrl, formationProgram, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFormationProgram>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFormationProgram[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

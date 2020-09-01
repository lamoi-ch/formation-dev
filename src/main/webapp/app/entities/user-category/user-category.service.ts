import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IUserCategory } from 'app/shared/model/user-category.model';

type EntityResponseType = HttpResponse<IUserCategory>;
type EntityArrayResponseType = HttpResponse<IUserCategory[]>;

@Injectable({ providedIn: 'root' })
export class UserCategoryService {
  public resourceUrl = SERVER_API_URL + 'api/user-categories';

  constructor(protected http: HttpClient) {}

  create(userCategory: IUserCategory): Observable<EntityResponseType> {
    return this.http.post<IUserCategory>(this.resourceUrl, userCategory, { observe: 'response' });
  }

  update(userCategory: IUserCategory): Observable<EntityResponseType> {
    return this.http.put<IUserCategory>(this.resourceUrl, userCategory, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IUserCategory>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUserCategory[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

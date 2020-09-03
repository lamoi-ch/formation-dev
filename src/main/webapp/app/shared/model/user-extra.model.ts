import { IUserCategory } from 'app/shared/model/user-category.model';

export interface IUserExtra {
  id?: number;
  name?: string;
  userCategory?: IUserCategory;
}

export class UserExtra implements IUserExtra {
  constructor(public id?: number, public name?: string, public userCategory?: IUserCategory) {}
}

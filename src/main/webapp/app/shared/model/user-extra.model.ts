export interface IUserExtra {
  id?: number;
  name?: string;
  userCategoryName?: string;
  userCategoryId?: number;
}

export class UserExtra implements IUserExtra {
  constructor(public id?: number, public name?: string, public userCategoryName?: string, public userCategoryId?: number) {}
}

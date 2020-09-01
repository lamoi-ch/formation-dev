export interface IUserCategory {
  id?: number;
  name?: string;
}

export class UserCategory implements IUserCategory {
  constructor(public id?: number, public name?: string) {}
}

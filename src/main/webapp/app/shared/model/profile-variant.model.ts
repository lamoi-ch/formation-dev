export interface IProfileVariant {
  id?: number;
  name?: string;
}

export class ProfileVariant implements IProfileVariant {
  constructor(public id?: number, public name?: string) {}
}

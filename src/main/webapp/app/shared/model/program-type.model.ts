export interface IProgramType {
  id?: number;
  name?: string;
}

export class ProgramType implements IProgramType {
  constructor(public id?: number, public name?: string) {}
}

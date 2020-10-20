export interface IConstructorNamedParameter {
  Name: string;
  Value: object;
}

export class ConstructorNamedParameter implements IConstructorNamedParameter {
  constructor(name: string, value: object) {
    this.Name = name;
    this.Value = value;
  }

  public Name: string;
  public Value: object;
}

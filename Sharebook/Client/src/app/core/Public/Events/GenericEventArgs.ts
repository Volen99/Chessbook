import {EventArgs} from "../../../c#-objects/TypeScript.NET-Core/packages/Events/source/EventArgs";

// EventArgs with value of Type T
export class GenericEventArgs<T> extends EventArgs {
  constructor(value: T) {
    super();
    this.Value = value;
  }

  public Value: T;
}

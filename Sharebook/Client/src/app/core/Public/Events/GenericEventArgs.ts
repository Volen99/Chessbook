
// EventArgs with value of Type T
export class GenericEventArgs<T> /*extends EventArgs*/ {
  constructor(value: T) {
    // super();

    this.value = value;
  }

  public value: T;
}

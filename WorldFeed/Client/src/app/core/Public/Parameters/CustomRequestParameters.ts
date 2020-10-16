import StringBuilder from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Text/StringBuilder";

// Allow developers to enhance default requests with additional query parameters
export interface ICustomRequestParameters {
  // Collection of custom query parameters
  customQueryParameters: Array<[string, string]>;

  // Formatted string containing all the query parameters to append to a query.
  formattedCustomQueryParameters: string;

  // Add a custom query parameter.
  addCustomQueryParameter(name: string, value: string): void;

  // Clear the query parameters of the query.
  clearCustomQueryParameters(): void;
}

export class CustomRequestParameters implements ICustomRequestParameters {
  private readonly _customQueryParameters: Array<[string, string]>;

  constructor(parameters?: ICustomRequestParameters) {
    this._customQueryParameters = new Array<[string, string]>();

    if (parameters) {
      this._customQueryParameters = parameters.customQueryParameters;
    }
  }

  get formattedCustomQueryParameters(): string {
    if (this._customQueryParameters.length === 0) {
      return "";
    }

    let queryParameters = new StringBuilder(`${this._customQueryParameters[0].Item1}=${this._customQueryParameters[0].Item2}`);

    for (let i = 1; i < this._customQueryParameters.length; ++i) {
      queryParameters.append(`&${this._customQueryParameters[i].Item1}=${this._customQueryParameters[i].Item2}`);
    }

    return queryParameters.toString();
  }

  get customQueryParameters(): Array<[string, string]> {
    return this._customQueryParameters;
  }

  public addCustomQueryParameter(name: string, value: string): void {
    let tuple: [string, string] = [name, value];  // TODO: might bug kk
    this._customQueryParameters.push(tuple);
  }

  clearCustomQueryParameters() {
    this._customQueryParameters.length = 0; // https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript
  }
}

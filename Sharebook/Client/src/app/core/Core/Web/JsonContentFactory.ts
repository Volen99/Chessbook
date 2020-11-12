import {IJsonObjectConverter, IJsonObjectConverterToken} from "../Helpers/IJsonObjectConverter";
import {Inject, Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class JsonContentFactory {
  private readonly _jsonObjectConverter: IJsonObjectConverter;

  public constructor(@Inject(IJsonObjectConverterToken) jsonObjectConverter: IJsonObjectConverter) {
    this._jsonObjectConverter = jsonObjectConverter;
  }

  public Create<T>(content: T): any {
    return null; // return Create(content, null);
  }

  // public  Create<T>(content: T, converters: JsonConverter[]): StringContent
  // {
  //     let jsonBody = this._jsonObjectConverter.Serialize(content, converters);
  //     return new StringContent(jsonBody, Encoding.UTF8, "application/json");
  // }
}

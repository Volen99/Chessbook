import {IJsonConvertWrapper} from "../../core/Core/Wrappers/IJConvertWrapper";
import {Injectable} from "@angular/core";

// Wrapper classes "cannot" be tested

@Injectable({
  providedIn: 'root',
})
export class JsonConvertWrapper implements IJsonConvertWrapper {
  DeserializeObject<T>(json: string): T;
  DeserializeObject<T>(json: string, converters: any[]): T;
  DeserializeObject(json: string, converters?: any[]): any /*T*/ {
    return undefined;
  }

  SerializeObject(o: object): string;
  SerializeObject(o: object, converters: any[]): string;
  SerializeObject(o: object, converters?: any[]): string {
    return "";
  }

}

// export class JsonConvertWrapper implements IJsonConvertWrapper
// {
//   private _jsonConvert: JsonConvert = new JsonConvert();
//
//     public  SerializeObject(o: object): string
//     {
//         return JsonConvert.SerializeObject(o);
//     }
//
//     public  SerializeObject(o: object, converters: JsonConverter[]): string
//     {
//         return JsonConvert.SerializeObject(o, converters);
//     }
//
//     public  DeserializeObject<T>(json: string): T
//     {
//         return this._jsonConvert.deserializeObject(json, T);
//     }
//
//     public  DeserializeObject<T>(json: string, converters: JsonConverter[]): T
//     {
//         return JsonConvert.DeserializeObject<T>(json, converters);
//     }
// }

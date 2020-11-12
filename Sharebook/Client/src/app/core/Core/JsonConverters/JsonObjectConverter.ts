import {Inject, Injectable} from "@angular/core";

import {IJsonObjectConverter} from "../Helpers/IJsonObjectConverter";
import {IJsonConvertWrapper, IJsonConvertWrapperToken} from "../Wrappers/IJConvertWrapper";
import {JsonConvert} from "json2typescript";
import {StringExtension} from "../Extensions/StringExtension";

@Injectable({
  providedIn: 'root',
})
export class JsonObjectConverter implements IJsonObjectConverter {
  private readonly _jsonConvertWrapper: IJsonConvertWrapper;

  constructor(@Inject(IJsonConvertWrapperToken) jsonConvertWrapper: IJsonConvertWrapper) {
    this._jsonConvertWrapper = jsonConvertWrapper;
  }

  public Serialize(o: object, converters: any[] = null): string {
    // if (converters == null) {
    //     converters = JsonPropertiesConverterRepository.Converters;
    // }
    //
    // return _jsonConvertWrapper.SerializeObject(o, converters);

    return null;
  }

  public Deserialize<T>(json: string, converters: any[] = null): T {
    if (!StringExtension.isMatchingJsonFormat(json)) {
         return null;
     }
    //
    // if (converters == null) {
    //     converters = JsonPropertiesConverterRepository.Converters;
    // }
    //
    // return _jsonConvertWrapper.DeserializeObject<T>(json, converters);

    return JSON.parse(json);
  }
}

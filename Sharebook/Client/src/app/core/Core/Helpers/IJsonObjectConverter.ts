import {inject, Inject, InjectionToken} from "@angular/core";

import {JsonObjectConverter} from "../JsonConverters/JsonObjectConverter";
import {JsonConvertWrapper} from "../../../logic/Wrapper/JsonConvertWrapper";

// This interface allows to (de)serialize any object or interface from the Tweetinvi API
export interface IJsonObjectConverter {
  Serialize(o: object, converters?: any[]): string;

  Deserialize<T>(json: string, converters?: any[]): T;
}

export const IJsonObjectConverterToken = new InjectionToken<IJsonObjectConverter>('IJsonObjectConverter', {
  providedIn: 'root',
  factory: () => new JsonObjectConverter(inject(JsonConvertWrapper)),
});


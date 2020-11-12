import {InjectionToken} from "@angular/core";
import {JsonConvertWrapper} from "../../../logic/Wrapper/JsonConvertWrapper";

export interface IJsonConvertWrapper {
  SerializeObject(o: object): string;

  SerializeObject(o: object, converters: any[] /*JsonConverter[]*/): string;

  DeserializeObject<T>(json: string): T;

  DeserializeObject<T>(json: string, converters: any[] /*JsonConverter[]*/): T;
}

export const IJsonConvertWrapperToken = new InjectionToken<IJsonConvertWrapper>('IJsonConvertWrapper', {
  providedIn: 'root',
  factory: () => new JsonConvertWrapper(),
});

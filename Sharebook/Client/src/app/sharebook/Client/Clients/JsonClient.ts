import {Injectable} from "@angular/core";

import {IJsonClient} from "../../../core/Public/Client/Clients/IJsonClient";

@Injectable({
  providedIn: 'root',
})
export class JsonClient implements IJsonClient {
  constructor() {
  }

  public Serialize<T>(obj: T): string {
    // return _tweetinviJsonConverter.ToJson(obj);

    return null;
  }

  // public Serialize<TFrom, TTo>(obj: TFrom): string {
  //   return _tweetinviJsonConverter.ToJson<TFrom, TTo>(obj);
  // }

  public Deserialize<T>(json: string): T {
    // return _tweetinviJsonConverter.ConvertJsonTo<T>(json);

    return null;
  }
}

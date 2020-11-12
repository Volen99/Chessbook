import {Injectable} from "@angular/core";

import {ITwitterExceptionInfo} from "../../Exceptions/ITwitterExceptionInfo";

@Injectable({
  providedIn: 'root',
})
export class TwitterExceptionInfo implements ITwitterExceptionInfo {
  // [JsonProperty("message")];
  public message: string;

  // [JsonProperty("code")];
  public code: number;

  // [JsonProperty("label")];
  public label: string;
}

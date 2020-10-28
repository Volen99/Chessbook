import {ITwitterExceptionInfo} from "../../Exceptions/ITwitterExceptionInfo";
import {Injectable} from "@angular/core";

@Injectable()
export class TwitterExceptionInfo implements ITwitterExceptionInfo {
  // [JsonProperty("message")];
  public message: string;

  // [JsonProperty("code")];
  public code: number;

  // [JsonProperty("label")];
  public label: string;
}

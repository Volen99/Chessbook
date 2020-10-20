import {CustomRequestParameters} from "../CustomRequestParameters";
import {IRequestAuthUrlParameters} from "./IRequestAuthUrlParameters";
import {AuthAccessType} from './AuthAccessType';

export class RequestPinAuthUrlParameters extends CustomRequestParameters implements IRequestAuthUrlParameters {
  constructor() {
    super();
    this.callbackUrl = "oob";
  }

  public callbackUrl: string;
  public forceLogin?: boolean;
  public screenName: string;

  public RequestId: string;
  public authAccessType?: AuthAccessType;
}

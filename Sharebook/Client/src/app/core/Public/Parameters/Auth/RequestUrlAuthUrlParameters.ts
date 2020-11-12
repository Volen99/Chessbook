import Uri from "typescript-dotnet-commonjs/System/Uri/Uri";
import Type from "typescript-dotnet-commonjs/System/Types";

import {CustomRequestParameters} from "../CustomRequestParameters";
import {IRequestAuthUrlParameters} from "./IRequestAuthUrlParameters";
import {AuthAccessType} from './AuthAccessType';

export class RequestUrlAuthUrlParameters extends CustomRequestParameters implements IRequestAuthUrlParameters {

  constructor(urlOrUriOrParameters: string | Uri | IRequestAuthUrlParameters) {
    if (RequestUrlAuthUrlParameters.isIRequestAuthUrlParameters(urlOrUriOrParameters)) {
      super(urlOrUriOrParameters);

      this.callbackUrl = urlOrUriOrParameters?.callbackUrl;
      this.authAccessType = urlOrUriOrParameters?.authAccessType;
      this.forceLogin = urlOrUriOrParameters?.forceLogin;
      this.screenName = urlOrUriOrParameters?.screenName;
    } else {
      super();

      if (Type.isString(urlOrUriOrParameters)) {
        this.callbackUrl = urlOrUriOrParameters;
      } else {
        this.callbackUrl = urlOrUriOrParameters.absoluteUri;
      }
    }
  }

  public callbackUrl: string;
  public forceLogin?: boolean;
  public screenName: string;

  public authAccessType?: AuthAccessType;

  private static isIRequestAuthUrlParameters(urlOrUriOrParameters: any): urlOrUriOrParameters is IRequestAuthUrlParameters {
    return (urlOrUriOrParameters as IRequestAuthUrlParameters).callbackUrl !== undefined;
  }
}

// public RequestUrlAuthUrlParameters(string url)
// {
//     CallbackUrl = url;
// }

// public RequestUrlAuthUrlParameters(Uri uri)
// {
//     CallbackUrl = uri.AbsoluteUri;
// }

// public RequestUrlAuthUrlParameters(IRequestAuthUrlParameters parameters) : base(parameters)
// {
//     CallbackUrl = parameters?.CallbackUrl;
//     AuthAccessType = parameters?.AuthAccessType;
//     ForceLogin = parameters?.ForceLogin;
//     ScreenName = parameters?.ScreenName;
// }

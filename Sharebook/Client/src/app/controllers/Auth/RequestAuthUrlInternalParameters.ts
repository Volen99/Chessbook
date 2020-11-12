import {IRequestAuthUrlParameters} from "../../core/Public/Parameters/Auth/IRequestAuthUrlParameters";
import {RequestUrlAuthUrlParameters} from "../../core/Public/Parameters/Auth/RequestUrlAuthUrlParameters";
import {IAuthenticationRequest} from "../../core/Public/Models/Authentication/IAuthenticationRequest";

export class RequestAuthUrlInternalParameters extends RequestUrlAuthUrlParameters {
  constructor(parameters: IRequestAuthUrlParameters, authRequest: IAuthenticationRequest) {
    super(parameters);
    this.authRequest = authRequest;
  }

  public authRequest: IAuthenticationRequest;
}

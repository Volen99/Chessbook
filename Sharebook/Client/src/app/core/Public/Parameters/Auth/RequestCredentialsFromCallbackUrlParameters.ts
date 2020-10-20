import {IAuthenticationRequest} from "../../Models/Authentication/IAuthenticationRequest";

export interface IRequestCredentialsFromCallbackUrlParameters {
  // Callback url called by Twitter auth redirection
  callbackUrl: string;

  // Token returned by the AuthenticationContext when
  authRequest: IAuthenticationRequest;
}

export class RequestCredentialsFromCallbackUrlParameters implements IRequestCredentialsFromCallbackUrlParameters {
  public callbackUrl: string;
  public authRequest: IAuthenticationRequest;
}

import {IAuthenticationRequest} from "../../Models/Authentication/IAuthenticationRequest";

export interface IRequestCredentialsFromPinCodeParameters {
  // PinCode entered by the user
  pinCode: string;

  // Token returned by the AuthenticationContext when
  authRequest: IAuthenticationRequest;
}

export class RequestCredentialsFromPinCodeParameters implements IRequestCredentialsFromPinCodeParameters {
  public pinCode: string;
  public authRequest: IAuthenticationRequest;
}

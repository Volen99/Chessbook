import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";
import {IAuthenticationRequest} from "../../Models/Authentication/IAuthenticationRequest";
import Uri from "../../../../c#-objects/TypeScript.NET-Core/packages/Web/source/Uri/Uri";
import {IAuthenticationRequestStore} from "../../Auth/LocalAuthenticationRequestStore";
import Exception from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Exception";
import ArgumentException from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Exceptions/ArgumentException";
import Type from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Types";

// For more information visit: https://developer.twitter.com/en/docs/basics/authentication/api-reference/access_token
export interface IRequestCredentialsParameters extends ICustomRequestParameters {
  // The verification code returned by Twitter also known as oauth_verifier
  verifierCode: string;

  // Token returned by the AuthenticationContext when
  authRequest: IAuthenticationRequest;
}

export class RequestCredentialsParameters extends CustomRequestParameters implements IRequestCredentialsParameters {

  constructor(verifierCode: string, authenticationRequest: IAuthenticationRequest) {
    super();
    this.verifierCode = verifierCode;
    this.authRequest = authenticationRequest;
  }

  public verifierCode: string;

  public authRequest: IAuthenticationRequest;

  // Generate request credentials parameters to authenticate with pinCode
  public static FromPinCode(pinCode: string, authRequest: IAuthenticationRequest): IRequestCredentialsParameters {
    return new RequestCredentialsParameters(pinCode, authRequest);
  }

  public static FromCallbackUrl(callbackUriOrUrl: Uri | string, authRequest: IAuthenticationRequest): IRequestCredentialsParameters {
    let callbackUrl: string;
    if (Type.isString(callbackUriOrUrl)) {
      callbackUrl = callbackUriOrUrl;
    } else {
      callbackUrl = callbackUriOrUrl.absoluteUri;
    }

    let oAuthVerifier = callbackUrl.getURLParameter("oauth_verifier");
    return new RequestCredentialsParameters(oAuthVerifier, authRequest);
  }

  /// <summary>
  /// Generate the request credentials parameters from an AuthenticationTokenProvider
  /// If the url does not contain the expected input or the token provider cannot find
  /// the authentication token, this will return an error.
  /// </summary>
  /// <exception cref="ArgumentException">When callback url is not properly formatted</exception>
  public static async FromCallbackUrlAsync(callbackUrl: string, authenticationRequestStore: IAuthenticationRequestStore): Promise<IRequestCredentialsParameters> {
    let tokenId = authenticationRequestStore.extractAuthenticationRequestIdFromCallbackUrl(callbackUrl);

    let authToken = await authenticationRequestStore.getAuthenticationRequestFromIdAsync(tokenId); // .ConfigureAwait(false);
    if (authToken == null) {
      throw new Exception("Could not retrieve the authentication token");
    }

    await authenticationRequestStore.removeAuthenticationTokenAsync(tokenId); // .ConfigureAwait(false);

    let oAuthVerifier = callbackUrl.getURLParameter("oauth_verifier");
    if (oAuthVerifier == null) {
      throw new ArgumentException(`oauth_verifier query parameter not found, this is required to authenticate the user`, nameof(callbackUrl));
    }

    return new RequestCredentialsParameters(oAuthVerifier, authToken);
  }
}

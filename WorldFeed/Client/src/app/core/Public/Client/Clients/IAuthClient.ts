import Uri from "../../../../c#-objects/TypeScript.NET-Core/packages/Web/source/Uri/Uri";
import {IAuthClientParametersValidator} from "../../../Core/Client/Validators/AuthClientParametersValidator";
import {ICreateBearerTokenParameters} from "../../Parameters/Auth/CreateBearerTokenParameters";
import {IAuthenticationRequest} from "../../Models/Authentication/IAuthenticationRequest";
import {IRequestAuthUrlParameters} from "../../Parameters/Auth/IRequestAuthUrlParameters";
import {ITwitterCredentials} from "../../Models/Authentication/TwitterCredentials";
import {IRequestCredentialsParameters} from "../../Parameters/Auth/RequestCredentialsParameters";
import {InvalidateTokenResponse} from "../../Models/Authentication/InvalidateTokenResponse";
import {IInvalidateBearerTokenParameters} from "../../Parameters/Auth/InvalidateBearerTokenParameters";
import {IInvalidateAccessTokenParameters} from "../../Parameters/Auth/InvalidateAccessTokenParameters";

export interface IAuthClient {
  // Validate all the Account activity client parameters
  parametersValidator: IAuthClientParametersValidator;

  createBearerTokenAsync(): Promise<string>;

  /// <summary>
  /// Allows a registered application to obtain an OAuth 2 Bearer Token.
  /// Bearer token allows to make API requests on an application's own behalf, without a user context.
  /// This is called Application-only authentication.
  /// </summary>
  /// <para> https://developer.twitter.com/en/docs/basics/authentication/api-reference/token </para>
  /// <returns>The bearer token to use for application only authentication</returns>
  createBearerTokenAsync(parameters: ICreateBearerTokenParameters): Promise<string>;

  /// <summary>
  /// Gets the bearer token generated by <see cref="CreateBearerTokenAsync()"/> and updates the client's current credentials.
  /// To learn more about bearer token read <see cref="CreateBearerTokenAsync()"/>.
  /// </summary>
  /// <para>
  /// IMPORTANT NOTE: The setter is for convenience. It is strongly recommended to create a new TwitterClient instead.
  /// As using this setter could result in unexpected concurrency between the time of set and the execution of previous
  /// non awaited async operations.
  /// </para>
  /// <para> https://developer.twitter.com/en/docs/basics/authentication/api-reference/token </para>
  initializeClientBearerTokenAsync(): Promise<void>;

  /// <summary>
  /// Initiates a pin based authentication process for a user.
  /// </summary>
  /// <para> https://developer.twitter.com/en/docs/basics/authentication/api-reference/request_token </para>
  /// <returns>An AuthenticationRequest containing the url to redirect the user</returns>
  requestAuthenticationUrlAsync(): Promise<IAuthenticationRequest>;

  requestAuthenticationUrlAsync(callbackUrl: string): Promise<IAuthenticationRequest>;

  requestAuthenticationUrlAsync(callbackUri: Uri): Promise<IAuthenticationRequest>;

  /// <summary>
  /// Initiates the authentication process for a user.
  /// </summary>
  /// <para> https://developer.twitter.com/en/docs/basics/authentication/api-reference/request_token </para>
  /// <returns>An AuthenticationRequest containing the url to redirect the user</returns>
  requestAuthenticationUrlAsync(parameters: IRequestAuthUrlParameters): Promise<IAuthenticationRequest>;

  requestCredentialsFromVerifierCodeAsync(verifierCode: string, authenticationRequest: IAuthenticationRequest): Promise<ITwitterCredentials>;

  /// <summary>
  /// Request credentials with a verifierCode
  /// </summary>
  /// <para> https://developer.twitter.com/en/docs/basics/authentication/api-reference/token </para>
  /// <returns>The requested user credentials</returns>
  requestCredentialsAsync(parameters: IRequestCredentialsParameters): Promise<ITwitterCredentials>;

  requestCredentialsFromCallbackUrlAsync(callbackUrl: string, authenticationRequest: IAuthenticationRequest): Promise<ITwitterCredentials>;

  /// <summary>
  /// Request credentials from an AuthenticationRequest.
  /// This is assuming that the callback url contains the expected parameter,
  /// and that the AuthenticationTokenProvider has access to the returned token id.
  /// </summary>
  /// <para> https://developer.twitter.com/en/docs/basics/authentication/api-reference/token </para>
  /// <returns>The requested user credentials</returns>
  requestCredentialsFromCallbackUrlAsync(callbackUri: Uri, authenticationRequest: IAuthenticationRequest): Promise<ITwitterCredentials>

  invalidateBearerTokenAsync(): Promise<InvalidateTokenResponse>;

  /// <summary>
  /// Invalidates a BearerToken
  /// </summary>
  /// <para> https://developer.twitter.com/en/docs/basics/authentication/api-reference/invalidate_bearer_token </para>
  invalidateBearerTokenAsync(parameters: IInvalidateBearerTokenParameters): Promise<InvalidateTokenResponse>;

  invalidateAccessTokenAsync(): Promise<InvalidateTokenResponse>;

  /// <summary>
  /// Invalidate an AccessToken
  /// </summary>
  /// <para> https://developer.twitter.com/en/docs/basics/authentication/api-reference/invalidate_access_token </para>
  invalidateAccessTokenAsync(parameters: IInvalidateAccessTokenParameters): Promise<InvalidateTokenResponse>;
}
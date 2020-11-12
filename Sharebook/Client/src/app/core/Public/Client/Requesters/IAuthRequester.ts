import {inject, Inject, InjectionToken} from "@angular/core";

import {ITwitterResult} from "../../../Core/Web/TwitterResult";
import {ICreateBearerTokenParameters} from "../../Parameters/Auth/CreateBearerTokenParameters";
import {CreateTokenResponseDTO} from "../../../Core/DTO/CreateTokenResponseDTO";
import {IRequestAuthUrlParameters} from "../../Parameters/Auth/IRequestAuthUrlParameters";
import {IAuthenticationRequest} from "../../Models/Authentication/IAuthenticationRequest";
import {IRequestCredentialsParameters} from "../../Parameters/Auth/RequestCredentialsParameters";
import {ITwitterCredentials} from "../../Models/Authentication/TwitterCredentials";
import {IInvalidateBearerTokenParameters} from "../../Parameters/Auth/InvalidateBearerTokenParameters";
import {InvalidateTokenResponse} from "../../Models/Authentication/InvalidateTokenResponse";
import {IInvalidateAccessTokenParameters} from "../../Parameters/Auth/InvalidateAccessTokenParameters";
import {AuthRequester} from "../../../../sharebook/Client/Requesters/AuthRequester";
import {TwitterClientEvents} from "../../../Core/Events/TweetinviGlobalEvents";
import {AuthClientRequiredParametersValidator} from "../../../Core/Client/Validators/AuthClientRequiredParametersValidator";
import {AuthController} from "../../../../controllers/Auth/AuthController";
import {TwitterClient} from "../../../../sharebook/TwitterClient";

export interface IAuthRequester {
  /// <summary>
  /// Allows a registered application to obtain an OAuth 2 Bearer Token.
  /// Bearer token allows to make API requests on an application's own behalf, without a user context.
  /// This is called Application-only authentication.
  /// </summary>
  /// <param name="parameters"></param>
  /// <para> https://developer.twitter.com/en/docs/basics/authentication/api-reference/token </para>
  /// <returns>The bearer token to use for application only authentication</returns>
  createBearerTokenAsync(parameters: ICreateBearerTokenParameters): Promise<ITwitterResult<CreateTokenResponseDTO>>;

  /// <summary>
  /// Initiates the authentication process for a user.
  /// The AuthenticationContext returned contains a url to authenticate on twitter.
  /// </summary>
  /// <para> https://developer.twitter.com/en/docs/basics/authentication/api-reference/request_token </para>
  /// <returns>An AuthenticationContext containing both the url to redirect to and an AuthenticationToken</returns>
  requestAuthUrlAsync(parameters: IRequestAuthUrlParameters): Promise<ITwitterResult<IAuthenticationRequest>>;

  /// <summary>
  /// Request credentials with a verifierCode
  /// </summary>
  /// <para> https://developer.twitter.com/en/docs/basics/authentication/api-reference/token </para>
  /// <returns>The requested user credentials</returns>
  requestCredentialsAsync(parameters: IRequestCredentialsParameters): Promise<ITwitterResult<ITwitterCredentials>>;

  /// <summary>
  /// Invalidate bearer token
  /// </summary>
  /// <para> https://developer.twitter.com/en/docs/basics/authentication/api-reference/invalidate_bearer_token </para>
  /// <returns>Request result</returns>
  invalidateBearerTokenAsync(parameters: IInvalidateBearerTokenParameters): Promise<ITwitterResult<InvalidateTokenResponse>>;

  /// <summary>
  /// Invalidate access token
  /// </summary>
  /// <para> https://developer.twitter.com/en/docs/basics/authentication/api-reference/invalidate_access_token </para>
  /// <returns>Request result</returns>
  invalidateAccessTokenAsync(parameters: IInvalidateAccessTokenParameters): Promise<ITwitterResult<InvalidateTokenResponse>>;
}

export const IAuthRequesterToken = new InjectionToken<IAuthRequester>('IAuthRequester', {
  providedIn: 'root',
  factory: () => new AuthRequester(inject(TwitterClient), inject(TwitterClientEvents),
    inject(AuthController), inject(AuthClientRequiredParametersValidator)),
});

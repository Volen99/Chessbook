import {Inject, Injectable} from "@angular/core";

import {IAuthController} from "../../core/Core/Controllers/IAuthController";
import {Resources} from "../../properties/resources";
import {ITwitterResult, TwitterResult} from "../../core/Core/Web/TwitterResult";
import {ITwitterRequest} from "../../core/Public/Models/Interfaces/ITwitterRequest";
import {TwitterAuthException} from "../../core/Public/Exceptions/TwitterAuthException";
import {TwitterAuthAbortedException} from "../../core/Public/Exceptions/TwitterAuthAbortedException";
import {IAuthQueryExecutor, IAuthQueryExecutorToken} from "./AuthQueryExecutor";
import {ICreateBearerTokenParameters} from "../../core/Public/Parameters/Auth/CreateBearerTokenParameters";
import {IRequestAuthUrlParameters} from "../../core/Public/Parameters/Auth/IRequestAuthUrlParameters";
import {RequestAuthUrlInternalParameters} from "./RequestAuthUrlInternalParameters";
import {IAuthenticationRequest} from "../../core/Public/Models/Authentication/IAuthenticationRequest";
import {CreateTokenResponseDTO} from "../../core/Core/DTO/CreateTokenResponseDTO";
import {IRequestCredentialsParameters} from "../../core/Public/Parameters/Auth/RequestCredentialsParameters";
import {ITwitterCredentials, TwitterCredentials} from "../../core/Public/Models/Authentication/TwitterCredentials";
import {IInvalidateBearerTokenParameters} from "../../core/Public/Parameters/Auth/InvalidateBearerTokenParameters";
import {IInvalidateAccessTokenParameters} from "../../core/Public/Parameters/Auth/InvalidateAccessTokenParameters";
import {AuthenticationRequest} from "../../Tweetinvi.Credentials/Models/AuthenticationRequest";
import {InvalidateTokenResponse} from "../../core/Public/Models/Authentication/InvalidateTokenResponse";
import Regex from "typescript-dotnet-commonjs/System/Text/RegularExpressions";
import StringBuilder from "typescript-dotnet-commonjs/System/Text/StringBuilder";
import {StringBuilderExtensions} from "../../core/Core/Extensions/stringBuilder-extensions";

@Injectable({
  providedIn: 'root',
})
export class AuthController implements IAuthController {
  private readonly _authQueryExecutor: IAuthQueryExecutor;
  private readonly _parseRequestUrlResponseRegex: Regex;

  constructor(@Inject(IAuthQueryExecutorToken) authQueryExecutor: IAuthQueryExecutor) {
    this._authQueryExecutor = authQueryExecutor;
    this._parseRequestUrlResponseRegex = new Regex(Resources.Auth_RequestTokenParserRegex);
  }

  public createBearerTokenAsync(parameters: ICreateBearerTokenParameters, request: ITwitterRequest): Promise<ITwitterResult<CreateTokenResponseDTO>> {
    return this._authQueryExecutor.createBearerTokenAsync(parameters, request);
  }

  public async requestAuthUrlAsync(parameters: IRequestAuthUrlParameters, request: ITwitterRequest): Promise<ITwitterResult<IAuthenticationRequest>> {
    let authToken = new AuthenticationRequest(request.query.twitterCredentials);

    let authProcessParams = new RequestAuthUrlInternalParameters(parameters, authToken);

    if (!parameters.callbackUrl) {
      authProcessParams.callbackUrl = Resources.Auth_PinCodeUrl;
    }

    let requestTokenResponse = await this._authQueryExecutor.requestAuthUrlAsync(authProcessParams, request); // .ConfigureAwait(false);

    if (!requestTokenResponse.content || requestTokenResponse.content === Resources.Auth_RequestToken) {
      throw new TwitterAuthException(requestTokenResponse, "Invalid authentication response");
    }

    let tokenInformation = this._parseRequestUrlResponseRegex.match(requestTokenResponse.content);

    let callbackConfirmed: boolean;
    if (!(tokenInformation.groups["oauth_callback_confirmed"].toLocaleLowerCase() !== 'true') || !callbackConfirmed) {
      throw new TwitterAuthAbortedException(requestTokenResponse);
    }

    authToken.authorizationKey = tokenInformation.groups["oauth_token"];
    authToken.authorizationSecret = tokenInformation.groups["oauth_token_secret"];

    let authorizationUrl = new StringBuilder(Resources.Auth_AuthorizeBaseUrl);
    StringBuilderExtensions.addParameterToQuery(authorizationUrl, "oauth_token", authToken.authorizationKey);
    StringBuilderExtensions.addParameterToQuery(authorizationUrl, "force_login", parameters.forceLogin);
    StringBuilderExtensions.addParameterToQuery(authorizationUrl, "screen_name", parameters.screenName);

    authToken.authorizationURL = authorizationUrl.toString();

    let result = new TwitterResult<IAuthenticationRequest>();
    result.request = requestTokenResponse.request;
    result.response = requestTokenResponse.response;
    result.model = authToken;

    return result;
  }

  public async requestCredentialsAsync(parameters: IRequestCredentialsParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterCredentials>> {
    let twitterResult = await this._authQueryExecutor.requestCredentialsAsync(parameters, request); // .ConfigureAwait(false);

    // @ts-ignore
    let oAuthToken = twitterResult.content.getURLParameter("oauth_token");
    // @ts-ignore
    let oAuthTokenSecret = twitterResult.content.getURLParameter("oauth_token_secret");

    if (oAuthToken == null || oAuthTokenSecret == null) {
      throw new TwitterAuthException(twitterResult, "Invalid authentication response");
    }

    let credentials = new TwitterCredentials(
      parameters.authRequest.consumerKey,
      parameters.authRequest.consumerSecret,
      oAuthToken,
      oAuthTokenSecret);

    let result = new TwitterResult<ITwitterCredentials>();
    result.request = twitterResult.request;
    result.response = twitterResult.response;
    result.model = credentials;

    return result;
  }

  public invalidateBearerTokenAsync(parameters: IInvalidateBearerTokenParameters, request: ITwitterRequest): Promise<ITwitterResult<InvalidateTokenResponse>> {
    return this._authQueryExecutor.invalidateBearerTokenAsync(parameters, request);
  }

  public invalidateAccessTokenAsync(parameters: IInvalidateAccessTokenParameters, request: ITwitterRequest): Promise<ITwitterResult<InvalidateTokenResponse>> {
    return this._authQueryExecutor.invalidateAccessTokenAsync(parameters, request);
  }
}

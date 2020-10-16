import {IAuthController} from "../../core/Core/Controllers/IAuthController";
import Regex from 'src/app/c#-objects/TypeScript.NET-Core/packages/Core/source/Text/RegularExpressions';
import {Resources} from "../../properties/resources";
import Task from 'src/app/c#-objects/TypeScript.NET-Core/packages/Threading/source/Tasks/Task';
import {ITwitterResult, TwitterResult} from "../../core/Core/Web/TwitterResult";
import {ITwitterRequest} from "../../core/Public/Models/Interfaces/ITwitterRequest";
import {TwitterAuthException} from "../../core/Public/Exceptions/TwitterAuthException";
import {TwitterAuthAbortedException} from "../../core/Public/Exceptions/TwitterAuthAbortedException";
import StringBuilder from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Text/StringBuilder";

export class AuthController implements IAuthController
    {
        private readonly _authQueryExecutor: IAuthQueryExecutor;
        private readonly _parseRequestUrlResponseRegex: Regex;

        public AuthController(authQueryExecutor: IAuthQueryExecutor)
        {
            this._authQueryExecutor = authQueryExecutor;
            this._parseRequestUrlResponseRegex = new Regex(Resources.Auth_RequestTokenParserRegex);
        }

        public createBearerTokenAsync(parameters: ICreateBearerTokenParameters, request: ITwitterRequest): Task<ITwitterResult<CreateTokenResponseDTO>>
    {
            return this._authQueryExecutor.CreateBearerTokenAsync(parameters, request);
        }

        public async requestAuthUrlAsync(parameters: IRequestAuthUrlParameters, request: ITwitterRequest): Promise<ITwitterResult<IAuthenticationRequest>>
    {
            var authToken = new AuthenticationRequest(request.query.twitterCredentials);

            var authProcessParams = new RequestAuthUrlInternalParameters(parameters, authToken);

            if (string.IsNullOrEmpty(parameters.callbackUrl))
            {
                authProcessParams.CallbackUrl = Resources.Auth_PinCodeUrl;
            }

            var requestTokenResponse = await this._authQueryExecutor.RequestAuthUrlAsync(authProcessParams, request).ConfigureAwait(false);

            if (string.IsNullOrEmpty(requestTokenResponse.Content) || requestTokenResponse.Content == Resources.Auth_RequestToken)
            {
                throw new TwitterAuthException(requestTokenResponse, "Invalid authentication response");
            }

            var tokenInformation = this._parseRequestUrlResponseRegex.Match(requestTokenResponse.Content);

            if (!bool.TryParse(tokenInformation.Groups["oauth_callback_confirmed"].Value, out var callbackConfirmed) || !callbackConfirmed)
            {
                throw new TwitterAuthAbortedException(requestTokenResponse);
            }

            authToken.AuthorizationKey = tokenInformation.Groups["oauth_token"].Value;
            authToken.AuthorizationSecret = tokenInformation.Groups["oauth_token_secret"].Value;

            var authorizationUrl = new StringBuilder(Resources.Auth_AuthorizeBaseUrl);
            authorizationUrl.addParameterToQuery("oauth_token", authToken.AuthorizationKey);
            authorizationUrl.addParameterToQuery("force_login", parameters.forceLogin);
            authorizationUrl.addParameterToQuery("screen_name", parameters.screenName);

            authToken.AuthorizationURL = authorizationUrl.ToString();

            return new TwitterResult<IAuthenticationRequest>
            {
                request = requestTokenResponse.Request,
                response = requestTokenResponse.Response,
                model = authToken
            };
        }

        public async  requestCredentialsAsync(parameters: IRequestCredentialsParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterCredentials>>
        {
            var twitterResult = await this._authQueryExecutor.RequestCredentialsAsync(parameters, request).ConfigureAwait(false);

            var oAuthToken = twitterResult.Content.GetURLParameter("oauth_token");
            var oAuthTokenSecret = twitterResult.Content.GetURLParameter("oauth_token_secret");

            if (oAuthToken == null || oAuthTokenSecret == null)
            {
                throw new TwitterAuthException(twitterResult, "Invalid authentication response");
            }

            var credentials = new TwitterCredentials(
                parameters.authRequest.consumerKey,
                parameters.authRequest.consumerSecret,
                oAuthToken,
                oAuthTokenSecret);

            return new TwitterResult<ITwitterCredentials>
            {
                request = twitterResult.Request,
                response = twitterResult.Response,
                model = credentials
            };
        }

        public  invalidateBearerTokenAsync(parameters: IInvalidateBearerTokenParameters, request: ITwitterRequest): Task<ITwitterResult<InvalidateTokenResponse>>
        {
            return this._authQueryExecutor.InvalidateBearerTokenAsync(parameters, request);
        }

        public  invalidateAccessTokenAsync(parameters: IInvalidateAccessTokenParameters, request: ITwitterRequest): Task<ITwitterResult<InvalidateTokenResponse>>
        {
            return this._authQueryExecutor.InvalidateAccessTokenAsync(parameters, request);
        }
    }

namespace WorldFeed.Controllers.Auth
{
    using System.Text;
    using System.Text.RegularExpressions;
    using System.Threading.Tasks;

    using WorldFeed.Common.Controllers;
    using WorldFeed.Common.DTO;
    using WorldFeed.Common.Extensions;
    using WorldFeed.Common.Public.Exceptions;
    using WorldFeed.Common.Public.Models.Authentication;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Parameters.Auth;
    using WorldFeed.Common.Web;
    using WorldFeed.Controllers.Properties;
    using WorldFeed.Credentials.Models;

    public class AuthController : IAuthController
    {
        private readonly IAuthQueryExecutor authQueryExecutor;
        private readonly Regex parseRequestUrlResponseRegex;

        public AuthController(IAuthQueryExecutor authQueryExecutor)
        {
            this.authQueryExecutor = authQueryExecutor;
            this.parseRequestUrlResponseRegex = new Regex(Resources.Auth_RequestTokenParserRegex);
        }

        public Task<ITwitterResult<CreateTokenResponseDTO>> CreateBearerTokenAsync(ICreateBearerTokenParameters parameters, ITwitterRequest request)
        {
            return this.authQueryExecutor.CreateBearerTokenAsync(parameters, request);
        }

        public async Task<ITwitterResult<IAuthenticationRequest>> RequestAuthUrlAsync(IRequestAuthUrlParameters parameters, ITwitterRequest request)
        {
            var authToken = new AuthenticationRequest(request.Query.TwitterCredentials);

            var authProcessParams = new RequestAuthUrlInternalParameters(parameters, authToken);

            if (string.IsNullOrEmpty(parameters.CallbackUrl))
            {
                authProcessParams.CallbackUrl = Resources.Auth_PinCodeUrl;
            }

            var requestTokenResponse = await this.authQueryExecutor.RequestAuthUrlAsync(authProcessParams, request).ConfigureAwait(false);

            if (string.IsNullOrEmpty(requestTokenResponse.Content) || requestTokenResponse.Content == Resources.Auth_RequestToken)
            {
                throw new TwitterAuthException(requestTokenResponse, "Invalid authentication response");
            }

            var tokenInformation = this.parseRequestUrlResponseRegex.Match(requestTokenResponse.Content);

            if (!bool.TryParse(tokenInformation.Groups["oauth_callback_confirmed"].Value, out var callbackConfirmed) || !callbackConfirmed)
            {
                throw new TwitterAuthAbortedException(requestTokenResponse);
            }

            authToken.AuthorizationKey = tokenInformation.Groups["oauth_token"].Value;
            authToken.AuthorizationSecret = tokenInformation.Groups["oauth_token_secret"].Value;

            var authorizationUrl = new StringBuilder(Resources.Auth_AuthorizeBaseUrl);
            authorizationUrl.AddParameterToQuery("oauth_token", authToken.AuthorizationKey);
            authorizationUrl.AddParameterToQuery("force_login", parameters.ForceLogin);
            authorizationUrl.AddParameterToQuery("screen_name", parameters.ScreenName);

            authToken.AuthorizationURL = authorizationUrl.ToString();

            return new TwitterResult<IAuthenticationRequest>
            {
                Request = requestTokenResponse.Request,
                Response = requestTokenResponse.Response,
                Model = authToken
            };
        }

        public async Task<ITwitterResult<ITwitterCredentials>> RequestCredentialsAsync(IRequestCredentialsParameters parameters, ITwitterRequest request)
        {
            var twitterResult = await this.authQueryExecutor.RequestCredentialsAsync(parameters, request).ConfigureAwait(false);

            var oAuthToken = twitterResult.Content.GetURLParameter("oauth_token");
            var oAuthTokenSecret = twitterResult.Content.GetURLParameter("oauth_token_secret");

            if (oAuthToken == null || oAuthTokenSecret == null)
            {
                throw new TwitterAuthException(twitterResult, "Invalid authentication response");
            }

            var credentials = new TwitterCredentials(parameters.AuthRequest.ConsumerKey, parameters.AuthRequest.ConsumerSecret, oAuthToken, oAuthTokenSecret);

            return new TwitterResult<ITwitterCredentials>
            {
                Request = twitterResult.Request,
                Response = twitterResult.Response,
                Model = credentials
            };
        }

        public Task<ITwitterResult<InvalidateTokenResponse>> InvalidateBearerTokenAsync(IInvalidateBearerTokenParameters parameters, ITwitterRequest request)
        {
            return this.authQueryExecutor.InvalidateBearerTokenAsync(parameters, request);
        }

        public Task<ITwitterResult<InvalidateTokenResponse>> InvalidateAccessTokenAsync(IInvalidateAccessTokenParameters parameters, ITwitterRequest request)
        {
            return this.authQueryExecutor.InvalidateAccessTokenAsync(parameters, request);
        }
    }
}

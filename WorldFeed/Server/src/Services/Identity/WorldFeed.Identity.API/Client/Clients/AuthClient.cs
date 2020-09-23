namespace WorldFeed.Identity.API.Client.Clients
{
    using System;
    using System.Threading.Tasks;

    using WorldFeed.Common.Public.Parameters.Auth;
    using WorldFeed.Identity.API.Client.Requesters;
    using WorldFeed.Identity.API.Client.Validators;
    using WorldFeed.Identity.API.Infrastructure.Inject;
    using WorldFeed.Identity.API.Models.Authentication;

    public class AuthClient : IAuthClient
    {
        private readonly TwitterClient client;
        private readonly IAuthRequester authRequester;

        public AuthClient(TwitterClient client)
        {
            this.client = client;
            this.authRequester = client.Raw.Auth;
        }

        public IAuthClientParametersValidator ParametersValidator => this.client.ParametersValidator;

        public Task<string> CreateBearerTokenAsync()
        {
            return CreateBearerTokenAsync(new CreateBearerTokenParameters());
        }

        public async Task<string> CreateBearerTokenAsync(ICreateBearerTokenParameters parameters)
        {
            var twitterResult = await this.authRequester.CreateBearerTokenAsync(parameters).ConfigureAwait(false);
            return twitterResult?.Model.AccessToken;
        }

        public async Task InitializeClientBearerTokenAsync()
        {
            var bearerToken = await CreateBearerTokenAsync().ConfigureAwait(false);

            this.client.Credentials = new TwitterCredentials(this.client.Credentials)
            {
                BearerToken = bearerToken
            };
        }

        public Task<IAuthenticationRequest> RequestAuthenticationUrlAsync()
        {
            return RequestAuthenticationUrlAsync(new RequestPinAuthUrlParameters());
        }

        public Task<IAuthenticationRequest> RequestAuthenticationUrlAsync(string callbackUrl)
        {
            return RequestAuthenticationUrlAsync(new RequestUrlAuthUrlParameters(callbackUrl));
        }

        public Task<IAuthenticationRequest> RequestAuthenticationUrlAsync(Uri callbackUri)
        {
            return RequestAuthenticationUrlAsync(new RequestUrlAuthUrlParameters(callbackUri));
        }

        public async Task<IAuthenticationRequest> RequestAuthenticationUrlAsync(IRequestAuthUrlParameters parameters)
        {
            var twitterResult = await this.authRequester.RequestAuthUrlAsync(parameters).ConfigureAwait(false);
            return twitterResult?.Model;
        }

        public async Task<ITwitterCredentials> RequestCredentialsAsync(IRequestCredentialsParameters parameters)
        {
            var twitterResult = await this.authRequester.RequestCredentialsAsync(parameters).ConfigureAwait(false);
            return twitterResult?.Model;
        }

        public Task<ITwitterCredentials> RequestCredentialsFromVerifierCodeAsync(string verifierCode, IAuthenticationRequest authenticationRequest)
        {
            return RequestCredentialsAsync(new RequestCredentialsParameters(verifierCode, authenticationRequest));
        }

        public Task<ITwitterCredentials> RequestCredentialsFromCallbackUrlAsync(string callbackUrl, IAuthenticationRequest authenticationRequest)
        {
            return RequestCredentialsAsync(RequestCredentialsParameters.FromCallbackUrl(callbackUrl, authenticationRequest));
        }

        public Task<ITwitterCredentials> RequestCredentialsFromCallbackUrlAsync(Uri callbackUri, IAuthenticationRequest authenticationRequest)
        {
            return RequestCredentialsAsync(RequestCredentialsParameters.FromCallbackUrl(callbackUri, authenticationRequest));
        }

        public Task<InvalidateTokenResponse> InvalidateBearerTokenAsync()
        {
            return InvalidateBearerTokenAsync(new InvalidateBearerTokenParameters());
        }

        public async Task<InvalidateTokenResponse> InvalidateBearerTokenAsync(IInvalidateBearerTokenParameters parameters)
        {
            var twitterResult = await this.authRequester.InvalidateBearerTokenAsync(parameters).ConfigureAwait(false);
            return twitterResult?.Model;
        }

        public Task<InvalidateTokenResponse> InvalidateAccessTokenAsync()
        {
            return InvalidateAccessTokenAsync(new InvalidateAccessTokenParameters());
        }

        public async Task<InvalidateTokenResponse> InvalidateAccessTokenAsync(IInvalidateAccessTokenParameters parameters)
        {
            var twitterResult = await this.authRequester.InvalidateAccessTokenAsync(parameters).ConfigureAwait(false);
            return twitterResult?.Model;
        }
    }
}

namespace WorldFeed.Identity.API.Auth
{
    using System.Threading.Tasks;

    using WorldFeed.Common.Public.Models.Enums;
    using WorldFeed.Common.Public.Parameters.Auth;
    using WorldFeed.Identity.API.Application.Requesters;
    using WorldFeed.Identity.API.Application.Web;
    using WorldFeed.Identity.API.Application.WebLogic;
    using WorldFeed.Identity.API.Credentials.AuthHttpHandlers;
    using WorldFeed.Identity.API.DTO;
    using WorldFeed.Identity.API.Models.Authentication;

    public interface IAuthQueryExecutor
    {
        Task<ITwitterResult<CreateTokenResponseDTO>> CreateBearerTokenAsync(ICreateBearerTokenParameters parameters, ITwitterRequest request);

        Task<ITwitterResult> RequestAuthUrlAsync(RequestAuthUrlInternalParameters parameters, ITwitterRequest request);

        Task<ITwitterResult> RequestCredentialsAsync(IRequestCredentialsParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<InvalidateTokenResponse>> InvalidateBearerTokenAsync(IInvalidateBearerTokenParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<InvalidateTokenResponse>> InvalidateAccessTokenAsync(IInvalidateAccessTokenParameters parameters, ITwitterRequest request);
    }

    public class AuthQueryExecutor : IAuthQueryExecutor
    {
        private readonly IAuthQueryGenerator queryGenerator;
        private readonly IOAuthWebRequestGeneratorFactory oAuthWebRequestGeneratorFactory;
        private readonly ITwitterAccessor twitterAccessor;

        public AuthQueryExecutor(
            IAuthQueryGenerator queryGenerator,
            IOAuthWebRequestGeneratorFactory oAuthWebRequestGeneratorFactory,
            ITwitterAccessor twitterAccessor)
        {
            this.queryGenerator = queryGenerator;
            this.oAuthWebRequestGeneratorFactory = oAuthWebRequestGeneratorFactory;
            this.twitterAccessor = twitterAccessor;
        }

        public Task<ITwitterResult<CreateTokenResponseDTO>> CreateBearerTokenAsync(ICreateBearerTokenParameters parameters, ITwitterRequest request)
        {
            var oAuthQueryGenerator = this.oAuthWebRequestGeneratorFactory.Create(request);
            request.Query.Url = this.queryGenerator.GetCreateBearerTokenQuery(parameters);
            request.Query.HttpMethod = HttpMethod.POST;
            request.TwitterClientHandler = new BearerHttpHandler(oAuthQueryGenerator);
            return this.twitterAccessor.ExecuteRequestAsync<CreateTokenResponseDTO>(request);
        }

        public Task<ITwitterResult> RequestAuthUrlAsync(RequestAuthUrlInternalParameters parameters, ITwitterRequest request)
        {
            var oAuthWebRequestGenerator = this.oAuthWebRequestGeneratorFactory.Create();
            var callbackParameter = oAuthWebRequestGenerator.GenerateParameter("oauth_callback", parameters.CallbackUrl, true, true, false);

            request.Query.Url = this.queryGenerator.GetRequestAuthUrlQuery(parameters);
            request.Query.HttpMethod = HttpMethod.POST;
            request.TwitterClientHandler = new AuthHttpHandler(callbackParameter, parameters.AuthRequest, oAuthWebRequestGenerator);
            return this.twitterAccessor.ExecuteRequestAsync(request);
        }

        public Task<ITwitterResult> RequestCredentialsAsync(IRequestCredentialsParameters parameters, ITwitterRequest request)
        {
            var oAuthWebRequestGenerator = this.oAuthWebRequestGeneratorFactory.Create();
            var callbackParameter = oAuthWebRequestGenerator.GenerateParameter("oauth_verifier", parameters.VerifierCode, true, true, false);

            request.Query.Url = this.queryGenerator.GetRequestCredentialsQuery(parameters);
            request.Query.HttpMethod = HttpMethod.POST;
            request.Query.TwitterCredentials = new TwitterCredentials(parameters.AuthRequest.ConsumerKey, parameters.AuthRequest.ConsumerSecret);
            request.TwitterClientHandler = new AuthHttpHandler(callbackParameter, parameters.AuthRequest, oAuthWebRequestGenerator);
            return this.twitterAccessor.ExecuteRequestAsync(request);
        }

        public Task<ITwitterResult<InvalidateTokenResponse>> InvalidateBearerTokenAsync(IInvalidateBearerTokenParameters parameters, ITwitterRequest request)
        {
            var oAuthWebRequestGenerator = this.oAuthWebRequestGeneratorFactory.Create();

            request.Query.Url = this.queryGenerator.GetInvalidateBearerTokenQuery(parameters);
            request.Query.HttpMethod = HttpMethod.POST;
            request.TwitterClientHandler = new InvalidateTokenHttpHandler(oAuthWebRequestGenerator);
            return this.twitterAccessor.ExecuteRequestAsync<InvalidateTokenResponse>(request);
        }

        public Task<ITwitterResult<InvalidateTokenResponse>> InvalidateAccessTokenAsync(IInvalidateAccessTokenParameters parameters, ITwitterRequest request)
        {
            request.Query.Url = this.queryGenerator.GetInvalidateAccessTokenQuery(parameters);
            request.Query.HttpMethod = HttpMethod.POST;
            return this.twitterAccessor.ExecuteRequestAsync<InvalidateTokenResponse>(request);
        }
    }
}

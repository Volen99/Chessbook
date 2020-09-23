namespace WorldFeed.Identity.API.Credentials.AuthHttpHandlers
{
    using System.Net.Http;
    using System.Threading;
    using System.Threading.Tasks;
    using WorldFeed.Common.Models.Authentication;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Query;
    using WorldFeed.Identity.API.Application.Web;
    using WorldFeed.Identity.API.Application.WebLogic;
    using WorldFeed.WebLogic;

    public class AuthHttpHandler : TwitterClientHandler
    {
        private readonly IOAuthQueryParameter queryParameter;
        private readonly IAuthenticationRequest authRequest;

        public AuthHttpHandler(IOAuthQueryParameter queryParameter, IAuthenticationRequest authRequest, IOAuthWebRequestGenerator oAuthWebRequestGenerator) : base(oAuthWebRequestGenerator)
        {
            this.queryParameter = queryParameter;
            this.authRequest = authRequest;
        }

        protected override Task<HttpResponseMessage> SendAsync(ITwitterQuery twitterQuery, HttpRequestMessage request, CancellationToken cancellationToken)
        {
            var headers = WebRequestGenerator.GenerateApplicationParameters(twitterQuery.TwitterCredentials, this.authRequest, new[] { this.queryParameter });
            twitterQuery.AuthorizationHeader = WebRequestGenerator.GenerateAuthorizationHeader(request.RequestUri, request.Method.ToTweetinviHttpMethod(), headers);

            return base.SendAsync(request, cancellationToken, twitterQuery.AuthorizationHeader);
        }
    }
}

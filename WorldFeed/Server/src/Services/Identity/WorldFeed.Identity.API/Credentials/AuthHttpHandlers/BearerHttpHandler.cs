namespace WorldFeed.Identity.API.Credentials.AuthHttpHandlers
{
    using System;
    using System.Net.Http;
    using System.Text;
    using System.Threading;
    using System.Threading.Tasks;

    using WorldFeed.Common.Extensions;
    using WorldFeed.Common.Models.Authentication;
    using WorldFeed.Common.Query;
    using WorldFeed.Identity.API.Application.WebLogic;
    using WorldFeed.WebLogic;

    public class BearerHttpHandler : TwitterClientHandler
    {
        public BearerHttpHandler(IOAuthWebRequestGenerator oAuthWebRequestGenerator) : base(oAuthWebRequestGenerator)
        {
        }

        protected override Task<HttpResponseMessage> SendAsync(ITwitterQuery twitterQuery, HttpRequestMessage request, CancellationToken cancellationToken)
        {
            var authorizationHeader = GetBearerTokenAuthorizationHeader(twitterQuery.TwitterCredentials);
            request.Content = new StringContent("grant_type=client_credentials", Encoding.UTF8, "application/x-www-form-urlencoded");

            return SendAsync(request, cancellationToken, authorizationHeader);
        }

        public static string GetBearerTokenAuthorizationHeader(IReadOnlyConsumerCredentials credentials)
        {
            var concatenatedCredentials = StringFormater.UrlEncode(credentials.ConsumerKey) + ":" + StringFormater.UrlEncode(credentials.ConsumerSecret);
            var credBytes = Encoding.UTF8.GetBytes(concatenatedCredentials);
            var base64Credentials = Convert.ToBase64String(credBytes);

            return "Basic " + base64Credentials;
        }
    }
}

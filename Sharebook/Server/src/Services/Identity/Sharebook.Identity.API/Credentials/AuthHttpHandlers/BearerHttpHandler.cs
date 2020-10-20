namespace Sharebook.Identity.API.Credentials.AuthHttpHandlers
{
    using System;
    using System.Net.Http;
    using System.Text;
    using System.Threading;
    using System.Threading.Tasks;

    using Sharebook.Common.Extensions;
    using Sharebook.Common.Models.Authentication;
    using Sharebook.Common.Query;
    using Sharebook.Identity.API.Application.WebLogic;
    using Sharebook.WebLogic;

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

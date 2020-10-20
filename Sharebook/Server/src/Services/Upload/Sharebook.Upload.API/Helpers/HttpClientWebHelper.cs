namespace Sharebook.Upload.API.Helpers
{
    using System;
    using System.Net.Http;
    using System.Threading.Tasks;

    using Sharebook.Upload.API.Web;
    using Sharebook.Upload.API.WebLogic;
    using Sharebook.Upload.Application.Query;

    using HttpMethod = System.Net.Http.HttpMethod;

    public class HttpClientWebHelper : IHttpClientWebHelper
    {
        public HttpClientWebHelper()
        {
        }

        public async Task<HttpResponseMessage> GetHttpResponseAsync(ITwitterQuery twitterQuery, ITwitterClientHandler handler = null)
        {
            using (var client = this.GetHttpClient(twitterQuery, handler))
            {
                client.Timeout = twitterQuery.Timeout;

                var httpMethod = new HttpMethod(twitterQuery.HttpMethod.ToString());

                if (twitterQuery.HttpContent == null) // INIT goes here
                {
                    var request = new HttpRequestMessage(httpMethod, twitterQuery.Url);

                    return await client.SendAsync(request).ConfigureAwait(false);
                }
                else
                {
                    if (httpMethod != HttpMethod.Post)
                    {
                        throw new ArgumentException("Cannot send HttpContent in a WebRequest that is not POST.");
                    }

                    return await client.PostAsync(twitterQuery.Url, twitterQuery.HttpContent).ConfigureAwait(false);
                }
            }
        }

        public HttpClient GetHttpClient(ITwitterQuery twitterQuery, ITwitterClientHandler twitterHandler = null)
        {
            // var oAuthWebRequestGenerator = this.oAuthWebRequestGeneratorFactory.Create();
            var handler = (twitterHandler as TwitterClientHandler) ?? new TwitterClientHandler();
            handler.TwitterQuery = twitterQuery;

            var client = new HttpClient()
            {
                Timeout = twitterQuery.Timeout,
            };

            return client;
        }
    }
}

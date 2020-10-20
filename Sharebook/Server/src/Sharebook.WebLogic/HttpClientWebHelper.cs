//namespace WorldFeed.WebLogic    
//{
//    using System;
//    using System.Net.Http;
//    using System.Threading.Tasks;

//    using WorldFeed.Common.Helpers;
//    using WorldFeed.Common.Public.Models.Interfaces;
//    using WorldFeed.Common.Web;

//    using HttpMethod = System.Net.Http.HttpMethod;

//    public class HttpClientWebHelper : IHttpClientWebHelper
//    {
//        private readonly IOAuthWebRequestGeneratorFactory oAuthWebRequestGeneratorFactory;

//        public HttpClientWebHelper(IOAuthWebRequestGeneratorFactory oAuthWebRequestGeneratorFactory)
//        {
//            this.oAuthWebRequestGeneratorFactory = oAuthWebRequestGeneratorFactory;
//        }

//        public async Task<HttpResponseMessage> GetHttpResponseAsync(ITwitterQuery twitterQuery, ITwitterClientHandler handler = null)
//        {
//            using (var client = this.GetHttpClient(twitterQuery, handler))
//            {
//                client.Timeout = twitterQuery.Timeout;

//                var httpMethod = new HttpMethod(twitterQuery.HttpMethod.ToString());

//                if (twitterQuery.HttpContent == null)
//                {
//                    var request = new HttpRequestMessage(httpMethod, twitterQuery.Url);

//                    return await client.SendAsync(request).ConfigureAwait(false);
//                }
//                else
//                {
//                    if (httpMethod != HttpMethod.Post)
//                    {
//                        throw new ArgumentException("Cannot send HttpContent in a WebRequest that is not POST.");
//                    }

//                    return await client.PostAsync(twitterQuery.Url, twitterQuery.HttpContent).ConfigureAwait(false);
//                }
//            }
//        }

//        public HttpClient GetHttpClient(ITwitterQuery twitterQuery, ITwitterClientHandler twitterHandler = null)
//        {
//            var oAuthWebRequestGenerator = this.oAuthWebRequestGeneratorFactory.Create();
//            var handler = (twitterHandler as TwitterClientHandler) ?? new TwitterClientHandler(oAuthWebRequestGenerator);
//            handler.TwitterQuery = twitterQuery;

//            var client = new HttpClient(handler)
//            {
//                Timeout = twitterQuery.Timeout,
//            };

//            return client;
//        }
//    }
//}

namespace WorldFeed.Post.API.WebLogic
{
    using System;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using System.Threading;
    using System.Threading.Tasks;

    using WorldFeed.Common.Extensions;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Post.API.Application.Query;

    public class TwitterClientHandler : HttpClientHandler, ITwitterClientHandler
    {
        private readonly Action<ITwitterQuery, HttpRequestMessage> action;
        private readonly Func<ITwitterQuery, HttpRequestMessage, string> func;

        // protected IOAuthWebRequestGenerator WebRequestGenerator { get; }

        private ITwitterQuery twitterQuery;

        public TwitterClientHandler()  // IOAuthWebRequestGenerator oAuthWebRequestGenerator
        {
            UseCookies = false;
            UseDefaultCredentials = false;

            // WebRequestGenerator = oAuthWebRequestGenerator;
        }

        public TwitterClientHandler(Action<ITwitterQuery, HttpRequestMessage> action) : this()
        {
            this.action = action;
        }

        public TwitterClientHandler(Func<ITwitterQuery, HttpRequestMessage, string> func) : this()
        {
            this.func = func;
        }

        public ITwitterQuery TwitterQuery
        {
            get => this.twitterQuery;
            set
            {
                this.twitterQuery = value;

                if (value != null)
                {
                    Proxy = value.ProxyConfig;

                    if (Proxy != null)
                    {
                        UseProxy = true;
                    }
                }
                else
                {
                    Proxy = null;
                    UseProxy = false;
                }
            }
        }

        protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            return SendAsync(this.twitterQuery, request, cancellationToken);
        }

        protected virtual async Task<HttpResponseMessage> SendAsync(ITwitterQuery twitterQuery, HttpRequestMessage request, CancellationToken cancellationToken)
        {
            this.action?.Invoke(twitterQuery, request);

            if (twitterQuery.AuthorizationHeader == null)
            {
                if (this.func != null)
                {
                    twitterQuery.AuthorizationHeader = this.func(twitterQuery, request);
                }
                else
                {
                    // await WebRequestGenerator.SetTwitterQueryAuthorizationHeaderAsync(twitterQuery).ConfigureAwait(false);
                }
            }

            return await SendAsync(request, cancellationToken, twitterQuery.AuthorizationHeader).ConfigureAwait(false);
        }

        protected Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken, string authorizationHeader)
        {
            request.Headers.Add("User-Agent", "Tweetinvi/5.0.0-alpha-6");
            request.Headers.ExpectContinue = false;
            request.Headers.CacheControl = new CacheControlHeaderValue { NoCache = true };
            request.Headers.Add("Authorization", authorizationHeader);
            request.Version = new Version("1.1");

            this.twitterQuery?.AcceptHeaders.ForEach(contentType =>
            {
                request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue(contentType));
            });

            this.twitterQuery?.CustomHeaders.ForEach(customHeader =>
            {
                if (customHeader.Behaviour == CustomHeaderWill.RemoveGeneratedHeaders)
                {
                    request.Headers.Remove(customHeader.Key);
                    return;
                }

                if (customHeader.Behaviour == CustomHeaderWill.OverrideGeneratedHeaders)
                {
                    if (request.Headers.Contains(customHeader.Key))
                    {
                        request.Headers.Remove(customHeader.Key);
                    }
                }

                request.Headers.TryAddWithoutValidation(customHeader.Key, customHeader.Values);
            });

            return base.SendAsync(request, cancellationToken);
        }
    }
}

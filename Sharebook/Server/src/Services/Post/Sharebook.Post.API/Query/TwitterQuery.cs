namespace Sharebook.Post.API.Application.Query
{
    using System;
    using System.Collections.Generic;

    using Sharebook.Common.Public;
    using Sharebook.Common.Public.Models.Interfaces;
    using Sharebook.Common.Public.Models.RateLimits;
    using Sharebook.Common.Settings;

    using HttpMethod = Sharebook.Common.Public.Models.Enums.HttpMethod;

    public class TwitterQuery : TwitterRequestParameters, ITwitterQuery
    {
        public TwitterQuery()
        {
            _timeout = TimeSpan.FromSeconds(10);

            AcceptHeaders = new List<string>
            {
                "image/jpeg",
                "application/json"
            };

            HttpMethod = HttpMethod.GET;
            CustomHeaders = new CustomRequestHeaders();
        }

        public TwitterQuery(string queryURL, HttpMethod httpMethod) : this()
        {
            Url = queryURL;
            HttpMethod = httpMethod;
        }

        public TwitterQuery(ITwitterQuery source) : base(source)
        {
            if (source == null)
            {
                return;
            }
            ProxyConfig = source.ProxyConfig;
            Timeout = source.Timeout;
           // QueryParameters = source.QueryParameters?.ToArray();
           // TwitterCredentials = source.TwitterCredentials;
            CredentialsRateLimits = source.CredentialsRateLimits;
            QueryRateLimit = source.QueryRateLimit;
            DateWhenCredentialsWillHaveTheRequiredRateLimits = source.DateWhenCredentialsWillHaveTheRequiredRateLimits;
        }

        public IProxyConfig ProxyConfig { get; set; }
        private TimeSpan _timeout;
        public TimeSpan Timeout
        {
            get => _timeout;
            set
            {
                if ((int)value.TotalMilliseconds == 0) // Default
                {
                    _timeout = TimeSpan.FromSeconds(10);
                    return;
                }

                if (value.TotalMilliseconds < 0) // Infinite
                {
                    _timeout = TimeSpan.FromMilliseconds(System.Threading.Timeout.Infinite);
                    return;
                }

                _timeout = value;
            }
        }
        // public ITwitterCredentials TwitterCredentials { get; set; }
        // public IOAuthQueryParameter[] QueryParameters { get; set; }
        public IEndpointRateLimit QueryRateLimit { get; set; }
        public ICredentialsRateLimits CredentialsRateLimits { get; set; }
        public DateTime? DateWhenCredentialsWillHaveTheRequiredRateLimits { get; set; }
        public TimeSpan? TimeToWaitBeforeExecutingTheQuery
        {
            get
            {
                var diff = DateWhenCredentialsWillHaveTheRequiredRateLimits?.Subtract(DateTime.Now);
                if (diff == null)
                {
                    return null;
                }

                return diff > TimeSpan.Zero ? diff : TimeSpan.Zero;
            }
        }

        public void Initialize(ITweetinviSettings settings)
        {
            Timeout = settings.HttpRequestTimeout;
            ProxyConfig = settings.ProxyConfig;
        }

        public override string ToString()
        {
            return Url;
        }
    }
}

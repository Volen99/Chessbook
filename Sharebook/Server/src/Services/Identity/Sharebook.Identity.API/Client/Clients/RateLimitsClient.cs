namespace Sharebook.Identity.API.Client.Clients
{
    using System;
    using System.Threading.Tasks;

    using Sharebook.Common.Public.Client.Requesters;
    using Sharebook.Common.Public.Models.RateLimits;
    using Sharebook.Identity.API.Application.Parameters.HelpClient;
    using Sharebook.Identity.API.Application.Parameters.RateLimitsClient;
    using Sharebook.Identity.API.Auth.Authentication;
    using Sharebook.Identity.API.Infrastructure.Inject;
    using Sharebook.Identity.API.RateLimit;

    public class RateLimitsClient : IRateLimitsClient
    {
        private readonly ITwitterClient client;
        private readonly IRateLimitCacheManager rateLimitCacheManager;
        private readonly IRateLimitAwaiter rateLimitAwaiter;
        private readonly IHelpRequester helpRequester;

        public RateLimitsClient(ITwitterClient client)
        {
            var executionContext = client.CreateTwitterExecutionContext();

            this.client = client;
            this.helpRequester = client.Raw.Help;
            this.rateLimitCacheManager = executionContext.Container.Resolve<IRateLimitCacheManager>();
            this.rateLimitAwaiter = executionContext.Container.Resolve<IRateLimitAwaiter>();
        }

        public async Task InitializeRateLimitsManagerAsync()
        {
            var credentialsRateLimits = await this.rateLimitCacheManager.RateLimitCache.GetCredentialsRateLimitsAsync(this.client.Credentials).ConfigureAwait(false);
            if (credentialsRateLimits == null)
            {
                await this.rateLimitCacheManager.RefreshCredentialsRateLimitsAsync(this.client.Credentials).ConfigureAwait(false);
            }
        }

        public Task<ICredentialsRateLimits> GetRateLimitsAsync()
        {
            return GetRateLimitsAsync(new GetRateLimitsParameters());
        }

        public Task<ICredentialsRateLimits> GetRateLimitsAsync(RateLimitsSource from)
        {
            return GetRateLimitsAsync(new GetRateLimitsParameters
            {
                From = from
            });
        }

        public async Task<ICredentialsRateLimits> GetRateLimitsAsync(IGetRateLimitsParameters parameters)
        {
            switch (parameters.From)
            {
                case RateLimitsSource.CacheOnly:
                    return await this.rateLimitCacheManager.RateLimitCache.GetCredentialsRateLimitsAsync(this.client.Credentials).ConfigureAwait(false);
                case RateLimitsSource.TwitterApiOnly:
                    var twitterResult = await this.helpRequester.GetRateLimitsAsync(parameters).ConfigureAwait(false);
                    return this.client.Factories.CreateRateLimits(twitterResult?.Model);
                case RateLimitsSource.CacheOrTwitterApi:
                    return await this.rateLimitCacheManager.GetCredentialsRateLimitsAsync(this.client.Credentials).ConfigureAwait(false);
                default:
                    throw new ArgumentException(nameof(parameters.From));
            }
        }

        public Task<IEndpointRateLimit> GetEndpointRateLimitAsync(string url)
        {
            return GetEndpointRateLimitAsync(new GetEndpointRateLimitsParameters(url));
        }

        public Task<IEndpointRateLimit> GetEndpointRateLimitAsync(string url, RateLimitsSource from)
        {
            return GetEndpointRateLimitAsync(new GetEndpointRateLimitsParameters(url)
            {
                From = from
            });
        }

        public Task<IEndpointRateLimit> GetEndpointRateLimitAsync(IGetEndpointRateLimitsParameters parameters)
        {
            return this.rateLimitCacheManager.GetQueryRateLimitAsync(parameters, this.client.Credentials);
        }

        public Task WaitForQueryRateLimitAsync(string url)
        {
            return WaitForQueryRateLimitAsync(url, RateLimitsSource.CacheOrTwitterApi);
        }

        public Task WaitForQueryRateLimitAsync(string url, RateLimitsSource from)
        {
            var credentialsRateLimitParameters = new WaitForCredentialsRateLimitParameters(url)
            {
                Credentials = this.client.Credentials,
                ExecutionContext = this.client.CreateTwitterExecutionContext(),
                From = from
            };

            return this.rateLimitAwaiter.WaitForCredentialsRateLimitAsync(credentialsRateLimitParameters);
        }

        public Task WaitForQueryRateLimitAsync(IEndpointRateLimit endpointRateLimit)
        {
            return this.rateLimitAwaiter.WaitForCredentialsRateLimitAsync(endpointRateLimit, this.client.Credentials, this.client.CreateTwitterExecutionContext());
        }

        public Task ClearRateLimitCacheAsync(IReadOnlyTwitterCredentials credentials)
        {
            return this.rateLimitCacheManager.RateLimitCache.ClearAsync(credentials);
        }

        public Task ClearRateLimitCacheAsync()
        {
            return this.rateLimitCacheManager.RateLimitCache.ClearAsync(this.client.Credentials);
        }

        public Task ClearAllRateLimitCacheAsync()
        {
            return this.rateLimitCacheManager.RateLimitCache.ClearAllAsync();
        }
    }
}

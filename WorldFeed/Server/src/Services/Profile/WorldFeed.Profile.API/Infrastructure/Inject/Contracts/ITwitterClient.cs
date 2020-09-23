using WorldFeed.Common.Public.Client.Clients;
using WorldFeed.Common.Settings;
using WorldFeed.Profile.Application.Requesters;
using WorldFeed.Profile.Client;

namespace WorldFeed.Profile.Infrastructure.Inject
{
    public interface ITwitterClient
    {
        /// <summary>
        /// Client to execute all actions related with rate limits
        /// </summary>
        IRateLimitsClient RateLimits { get; }

        /// <summary>
        /// Client to execute all actions related with users
        /// </summary>
        IUsersClient Users { get; }

        /// <summary>
        /// Execute Request and receive request results
        /// </summary>
        IRawExecutors Raw { get; }

        /// <summary>
        /// Client's config
        /// </summary>
        ITweetinviSettings Config { get; }

        /// <summary>
        /// Simple way to construct tweetinvi objects
        /// </summary>
        ITwitterClientFactories Factories { get; }

        /// <summary>
        /// Help you perform json operations with Tweetinvi objects
        /// </summary>
        IJsonClient Json { get; }

        /// <summary>
        /// Validate parameters to ensure that they meet the default criteria
        /// </summary>
        IParametersValidator ParametersValidator { get; }

        /// <summary>
        /// Creates skeleton request representing a request from the client
        /// </summary>
        ITwitterRequest CreateRequest();

        /// <summary>
        /// Create an execution context for a request to be sent to Twitter.
        /// </summary>
        ITwitterExecutionContext CreateTwitterExecutionContext();
    }
}

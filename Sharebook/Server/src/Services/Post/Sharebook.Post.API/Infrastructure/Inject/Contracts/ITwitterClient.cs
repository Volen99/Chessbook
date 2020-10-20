namespace Sharebook.Post.API.Infrastructure.Inject.Contracts
{
    using Sharebook.Common.Public.Client.Clients;
    using Sharebook.Common.Settings;
    using Sharebook.Post.API.Application.Validations;
    using Sharebook.Post.API.Client;
    using Sharebook.Post.API.Events;
    using Sharebook.Post.Application.Requesters;
    using Sharebook.Post.Client.Clients;
    using Sharebook.Post.Client.Tools;

    public interface ITwitterClient
    {
        /// <summary>
        /// Client to execute all actions related with timelines
        /// </summary>
        ITimelinesClient Timelines { get; }

        /// <summary>
        /// Client to execute all actions related with tweets
        /// </summary>
        ITweetsClient Tweets { get; }

        /// <summary>
        /// Execute Request and receive request results
        /// </summary>
        IRawExecutors Raw { get; }

        /// <summary>
        /// Client's config
        /// </summary>
        ITweetinviSettings Config { get; }

        /// <summary>
        /// Listen to events raised by actions performed by the client
        /// </summary>
        IExternalClientEvents Events { get; }

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

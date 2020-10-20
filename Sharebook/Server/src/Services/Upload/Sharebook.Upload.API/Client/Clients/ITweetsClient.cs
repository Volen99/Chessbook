namespace Sharebook.Upload.API.Client.Clients
{
    using System.Threading.Tasks;

    using Sharebook.Common.Public.Models.Interfaces;
    using Sharebook.Upload.Application.Parameters.TweetsClient;
    using Sharebook.Upload.Client.Validators;
    using Sharebook.Upload.Domain;

    public interface ITweetsClient
    {
        /// <summary>
        /// Validate all the Tweets client parameters
        /// </summary>
        ITweetsClientParametersValidator ParametersValidator { get; }

        /// <inheritdoc cref="ITweetsClient.PublishTweetAsync(IPublishTweetParameters)" />
        Task<ITweet> PublishTweetAsync(string text);

        /// <summary>
        /// Publish a tweet
        /// <para>Read more : https://dev.twitter.com/rest/reference/post/statuses/update </para>
        /// </summary>
        /// <returns>Returns the published tweet</returns>
        Task<ITweet> PublishTweetAsync(IPublishTweetParameters parameters);

        /// <inheritdoc cref="ITweetsClient.PublishRetweetAsync(IPublishRetweetParameters)" />
        Task<ITweet> PublishRetweetAsync(long tweetId);

        /// <inheritdoc cref="ITweetsClient.PublishRetweetAsync(IPublishRetweetParameters)" />
        Task<ITweet> PublishRetweetAsync(ITweetIdentifier tweet);

        /// <summary>
        /// Publish a retweet
        /// <para>Read more : https://dev.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-statuses-retweet-id </para>
        /// </summary>
        /// <returns>The retweet</returns>
        Task<ITweet> PublishRetweetAsync(IPublishRetweetParameters parameters);
    }
}

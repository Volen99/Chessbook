namespace WorldFeed.Upload.API.Application.Requesters
{
    using System.Threading.Tasks;

    using WorldFeed.Upload.API.Web;
    using WorldFeed.Upload.Application.Parameters.TweetsClient;
    using WorldFeed.Upload.DTO;

    /// <summary>
    /// A client providing all the methods related with tweets.
    /// The results from this client contain additional metadata.
    /// </summary>
    public interface ITweetsRequester
    {
        /// <summary>
        /// Publish a tweet
        /// <para>Read more : https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-show-id </para>
        /// </summary>
        /// <returns>TwitterResult containing the published tweet</returns>
        Task<ITwitterResult<ITweetDTO>> PublishTweetAsync(IPublishTweetParameters parameters);

        /// <summary>
        /// Publish a retweet
        /// <para>Read more : https://dev.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-statuses-retweet-id </para>
        /// </summary>
        /// <returns>TwitterResult containing the published retweet</returns>
        Task<ITwitterResult<ITweetDTO>> PublishRetweetAsync(IPublishRetweetParameters parameters);
    }
}

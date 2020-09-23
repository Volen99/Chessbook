namespace WorldFeed.Post.Client.Requesters
{
    using System.Threading.Tasks;

    using WorldFeed.Common.Public.Models.Interfaces.DTO.QueryDTO;
    using WorldFeed.Post.Application.Parameters.TweetsClient;

    /// <summary>
    /// A client providing all the methods related with tweets.
    /// The results from this client contain additional metadata.
    /// </summary>
    public interface ITweetsRequester
    {
        /// <summary>
        /// Get a tweet
        /// <para>Read more : https://dev.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-show-id </para>
        /// </summary>
        /// <returns>TwitterResult containing specified tweet</returns>
        Task<ITwitterResult<ITweetDTO>> GetTweetAsync(IGetTweetParameters parameters);

        /// <summary>
        /// Publish a tweet
        /// <para>Read more : https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-show-id </para>
        /// </summary>
        /// <returns>TwitterResult containing the published tweet</returns>
        Task<ITwitterResult<ITweetDTO>> PublishTweetAsync(IPublishTweetParameters parameters);

        /// <summary>
        /// Destroy a tweet
        /// <para>Read more : https://dev.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-statuses-destroy-id </para>
        /// </summary>
        /// <returns>TwitterResult containing the destroyed tweet</returns>
        Task<ITwitterResult<ITweetDTO>> DestroyTweetAsync(IDestroyTweetParameters parameters);

        /// <summary>
        /// Get favorite tweets of a user
        /// <para>Read more : https://dev.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-favorites-list </para>
        /// </summary>
        /// <returns>Iterator over the list of tweets favorited by a user</returns>
        ITwitterPageIterator<ITwitterResult<ITweetDTO[]>, long?> GetUserFavoriteTweetsIterator(IGetUserFavoriteTweetsParameters parameters);

        /// <summary>
        /// Get multiple tweets
        /// <para>Read more : https://dev.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-lookup </para>
        /// </summary>
        /// <returns>TwitterResult containing requested tweets</returns>
        Task<ITwitterResult<ITweetDTO[]>> GetTweetsAsync(IGetTweetsParameters parameters);

        /// <summary>
        /// Get the retweets associated with a specific tweet
        /// <para>Read more : https://dev.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-retweets-id </para>
        /// </summary>
        /// <returns>TwitterResult containing the retweets</returns>
        Task<ITwitterResult<ITweetDTO[]>> GetRetweetsAsync(IGetRetweetsParameters parameters);

        /// <summary>
        /// Publish a retweet
        /// <para>Read more : https://dev.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-statuses-retweet-id </para>
        /// </summary>
        /// <returns>TwitterResult containing the published retweet</returns>
        Task<ITwitterResult<ITweetDTO>> PublishRetweetAsync(IPublishRetweetParameters parameters);

        /// <summary>
        /// Get the ids of the users who retweeted a specific tweet
        /// <para> Read more : https://dev.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-retweeters-ids </para>
        /// </summary>
        /// <returns>TwitterCursorResult to iterate over all the user's friends</returns>
        ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>> GetRetweeterIdsIterator(IGetRetweeterIdsParameters parameters);

        /// <summary>
        /// Destroy a retweet
        /// <para>Read more : https://dev.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-statuses-unretweet-id </para>
        /// </summary>
        /// <returns>TwitterResult containing the success status of the request</returns>
        Task<ITwitterResult<ITweetDTO>> DestroyRetweetAsync(IDestroyRetweetParameters parameters);

        /// <summary>
        /// Favorite a tweet
        /// </summary>
        /// <para>Read more : https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-favorites-destroy </para>
        /// <returns>TwitterResult containing the favorited tweet</returns>
        Task<ITwitterResult<ITweetDTO>> FavoriteTweetAsync(IFavoriteTweetParameters parameters);

        /// <summary>
        /// Remove the favorite of a tweet
        /// </summary>
        /// <para>Read more : https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-favorites-destroy </para>
        /// <returns>TwitterResult containing the no longer favorited tweet</returns>
        Task<ITwitterResult<ITweetDTO>> UnfavoriteTweetAsync(IUnfavoriteTweetParameters parameters);

        /// <summary>
        /// Get an oembed tweet
        /// </summary>
        /// <para>Read more : https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-oembed </para>
        /// <returns>TwitterResult containing the oembed tweet</returns>
        Task<ITwitterResult<IOEmbedTweetDTO>> GetOEmbedTweetAsync(IGetOEmbedTweetParameters parameters);
    }
}

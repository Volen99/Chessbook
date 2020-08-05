namespace WorldFeed.Common.QueryGenerators
{
    using WorldFeed.Common.Public.Parameters.TweetsClient;
    using WorldFeed.Common.Public.Parameters.TweetsClients;
    using WorldFeed.Common.Settings;

    public interface ITweetQueryGenerator
    {
        string GetTweetQuery(IGetTweetParameters parameters, TweetMode? requestTweetMode);
        string GetTweetsQuery(IGetTweetsParameters parameters, TweetMode? tweetMode);
        string GetPublishTweetQuery(IPublishTweetParameters parameters, TweetMode? requestTweetMode);
        string GetDestroyTweetQuery(IDestroyTweetParameters parameters, TweetMode? requestTweetMode);

        string GetFavoriteTweetsQuery(IGetUserFavoriteTweetsParameters parameters, TweetMode? requestTweetMode);

        string GetRetweetsQuery(IGetRetweetsParameters parameters, TweetMode? requestTweetMode);
        string GetPublishRetweetQuery(IPublishRetweetParameters parameters, TweetMode? requestTweetMode);
        string GetDestroyRetweetQuery(IDestroyRetweetParameters parameters, TweetMode? requestTweetMode);
        string GetRetweeterIdsQuery(IGetRetweeterIdsParameters parameters);

        string GetCreateFavoriteTweetQuery(IFavoriteTweetParameters parameters);
        string GetUnfavoriteTweetQuery(IUnfavoriteTweetParameters parameters);

        string GetOEmbedTweetQuery(IGetOEmbedTweetParameters parameters);
    }
}

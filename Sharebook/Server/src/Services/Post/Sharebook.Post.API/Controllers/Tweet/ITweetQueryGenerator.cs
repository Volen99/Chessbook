namespace Sharebook.Post.API.Controllers.Tweet
{
    using Sharebook.Common.Settings;
    using Sharebook.Post.Application.Parameters.TweetsClient;

    public interface ITweetQueryGenerator
    {
        string GetTweetQuery(IGetTweetParameters parameters, TweetMode? requestTweetMode);

        string GetTweetsQuery(IGetTweetsParameters parameters, TweetMode? tweetMode);

        string GetDestroyTweetQuery(IDestroyTweetParameters parameters, TweetMode? requestTweetMode);

        string GetFavoriteTweetsQuery(IGetUserFavoriteTweetsParameters parameters, TweetMode? requestTweetMode);

        string GetRetweetsQuery(IGetRetweetsParameters parameters, TweetMode? requestTweetMode);

        string GetDestroyRetweetQuery(IDestroyRetweetParameters parameters, TweetMode? requestTweetMode);

        string GetRetweeterIdsQuery(IGetRetweeterIdsParameters parameters);

        string GetCreateFavoriteTweetQuery(IFavoriteTweetParameters parameters);

        string GetUnfavoriteTweetQuery(IUnfavoriteTweetParameters parameters);

        string GetOEmbedTweetQuery(IGetOEmbedTweetParameters parameters);
    }
}

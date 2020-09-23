namespace WorldFeed.Upload.API.Controllers.Tweet
{
    using WorldFeed.Common.Settings;
    using WorldFeed.Upload.Application.Parameters.TweetsClient;

    public interface ITweetQueryGenerator
    {
        string GetPublishTweetQuery(IPublishTweetParameters parameters, TweetMode? requestTweetMode);
        
        string GetPublishRetweetQuery(IPublishRetweetParameters parameters, TweetMode? requestTweetMode);
    }
}

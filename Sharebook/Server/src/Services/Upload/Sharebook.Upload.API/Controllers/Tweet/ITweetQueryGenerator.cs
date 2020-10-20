namespace Sharebook.Upload.API.Controllers.Tweet
{
    using Sharebook.Common.Settings;
    using Sharebook.Upload.Application.Parameters.TweetsClient;

    public interface ITweetQueryGenerator
    {
        string GetPublishTweetQuery(IPublishTweetParameters parameters, TweetMode? requestTweetMode);
        
        string GetPublishRetweetQuery(IPublishRetweetParameters parameters, TweetMode? requestTweetMode);
    }
}

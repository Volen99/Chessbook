namespace WorldFeed.Upload.API.Controllers.Tweet
{
    using System.Threading.Tasks;

    using WorldFeed.Upload.API.Web;
    using WorldFeed.Upload.Application.Parameters.TweetsClient;
    using WorldFeed.Upload.Application.Requesters;
    using WorldFeed.Upload.DTO;

    public interface ITweetController
    {
        Task<ITwitterResult<ITweetDTO>> PublishTweetAsync(IPublishTweetParameters parameters, ITwitterRequest request);

        bool CanBePublished(string text);

        bool CanBePublished(IPublishTweetParameters publishTweetParameters);

        // Retweets - Publish
        Task<ITwitterResult<ITweetDTO>> PublishRetweetAsync(IPublishRetweetParameters parameters, ITwitterRequest request);
    }
}

namespace Sharebook.Upload.API.Controllers.Tweet
{
    using System.Threading.Tasks;

    using Sharebook.Upload.API.Web;
    using Sharebook.Upload.Application.Parameters.TweetsClient;
    using Sharebook.Upload.Application.Requesters;
    using Sharebook.Upload.DTO;

    public interface ITweetController
    {
        Task<ITwitterResult<ITweetDTO>> PublishTweetAsync(IPublishTweetParameters parameters, ITwitterRequest request);

        bool CanBePublished(string text);

        bool CanBePublished(IPublishTweetParameters publishTweetParameters);

        // Retweets - Publish
        Task<ITwitterResult<ITweetDTO>> PublishRetweetAsync(IPublishRetweetParameters parameters, ITwitterRequest request);
    }
}

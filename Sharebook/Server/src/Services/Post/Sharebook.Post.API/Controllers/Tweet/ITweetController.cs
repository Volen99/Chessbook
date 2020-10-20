namespace Sharebook.Post.API.Controllers.Tweet
{
    using System.Threading.Tasks;

    using Sharebook.Common.Public.Models.Interfaces.DTO.QueryDTO;
    using Sharebook.Post.API.Application.Web;
    using Sharebook.Post.API.Iterators;
    using Sharebook.Post.Application.Parameters.TweetsClient;
    using Sharebook.Post.Application.Requesters;
    using Sharebook.Post.DTO;

    public interface ITweetController
    {
        // TWEET
        Task<ITwitterResult<IPostDTO>> GetTweetAsync(IGetTweetParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<IPostDTO[]>> GetTweetsAsync(IGetTweetsParameters parameters, ITwitterRequest request);

        // Task<ITwitterResult<ITweetDTO>> PublishTweetAsync(IPublishTweetParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<IPostDTO>> DestroyTweetAsync(IDestroyTweetParameters parameters, ITwitterRequest request);

        // FAVORITES
        ITwitterPageIterator<ITwitterResult<IPostDTO[]>, long?> GetFavoriteTweetsIterator(IGetUserFavoriteTweetsParameters parameters, ITwitterRequest request);

        // Retweets - Destroy
        Task<ITwitterResult<IPostDTO>> DestroyRetweetAsync(IDestroyRetweetParameters parameters, ITwitterRequest request);

        // Get Retweets
        Task<ITwitterResult<IPostDTO[]>> GetRetweetsAsync(IGetRetweetsParameters parameters, ITwitterRequest request);

        // Get Retweeters
        ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>> GetRetweeterIdsIterator(IGetRetweeterIdsParameters parameters, ITwitterRequest request);

        // Favorite Tweet
        Task<ITwitterResult<IPostDTO>> FavoriteTweetAsync(IFavoriteTweetParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<IPostDTO>> UnfavoriteTweetAsync(IUnfavoriteTweetParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<IOEmbedTweetDTO>> GetOEmbedTweetAsync(IGetOEmbedTweetParameters parameters, ITwitterRequest request);
    }
}

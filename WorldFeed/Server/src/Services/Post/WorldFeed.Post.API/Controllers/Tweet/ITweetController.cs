namespace WorldFeed.Post.API.Controllers.Tweet
{
    using System.Threading.Tasks;

    using WorldFeed.Common.Public.Models.Interfaces.DTO.QueryDTO;
    using WorldFeed.Post.API.Application.Web;
    using WorldFeed.Post.API.Iterators;
    using WorldFeed.Post.Application.Parameters.TweetsClient;
    using WorldFeed.Post.Application.Requesters;
    using WorldFeed.Post.DTO;

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

namespace WorldFeed.Post.API.Controllers.Timeline
{
    using WorldFeed.Post.API.Application.Web;
    using WorldFeed.Post.API.Iterators;
    using WorldFeed.Post.Application.Parameters.TimelineClient;
    using WorldFeed.Post.Application.Requesters;
    using WorldFeed.Post.DTO;

    public interface ITimelineController
    {
        ITwitterPageIterator<ITwitterResult<IPostDTO[]>, long?> GetHomeTimelineIterator(IGetHomeTimelineParameters parameters, ITwitterRequest request);

        ITwitterPageIterator<ITwitterResult<IPostDTO[]>, long?> GetRetweetsOfMeTimelineIterator(IGetRetweetsOfMeTimelineParameters parameters, ITwitterRequest request);
    }
}

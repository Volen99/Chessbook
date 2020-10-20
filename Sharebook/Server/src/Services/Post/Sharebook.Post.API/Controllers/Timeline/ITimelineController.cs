namespace Sharebook.Post.API.Controllers.Timeline
{
    using Sharebook.Post.API.Application.Web;
    using Sharebook.Post.API.Iterators;
    using Sharebook.Post.Application.Parameters.TimelineClient;
    using Sharebook.Post.Application.Requesters;
    using Sharebook.Post.DTO;

    public interface ITimelineController
    {
        ITwitterPageIterator<ITwitterResult<IPostDTO[]>, long?> GetHomeTimelineIterator(IGetHomeTimelineParameters parameters, ITwitterRequest request);

        ITwitterPageIterator<ITwitterResult<IPostDTO[]>, long?> GetRetweetsOfMeTimelineIterator(IGetRetweetsOfMeTimelineParameters parameters, ITwitterRequest request);
    }
}

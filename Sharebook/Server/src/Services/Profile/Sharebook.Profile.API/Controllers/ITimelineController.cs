namespace Sharebook.Profile.API.Controllers
{
    using Sharebook.Profile.Application.Requesters;
    using Sharebook.Profile.Application.Web;

    public interface ITimelineController
    {
        ITwitterPageIterator<ITwitterResult<ITweetDTO[]>, long?> GetUserTimelineIterator(IGetUserTimelineParameters parameters, ITwitterRequest request);

        ITwitterPageIterator<ITwitterResult<ITweetDTO[]>, long?> GetMentionsTimelineIterator(IGetMentionsTimelineParameters parameters, ITwitterRequest request);

        ITwitterPageIterator<ITwitterResult<ITweetDTO[]>, long?> GetRetweetsOfMeTimelineIterator(IGetRetweetsOfMeTimelineParameters parameters, ITwitterRequest request);
    }
}

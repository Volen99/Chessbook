using WorldFeed.Common.Settings;

namespace WorldFeed.Common.Public.Parameters.TimelineClient
{
    /// <summary>
    /// For more information visit : https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-mentions_timeline
    /// </summary>
    /// <inheritdoc />
    public interface IGetMentionsTimelineParameters : ITimelineRequestParameters
    {
    }

    /// <inheritdoc />
    public class GetMentionsTimelineParameters : TimelineRequestParameters, IGetMentionsTimelineParameters
    {
        public GetMentionsTimelineParameters()
        {
            PageSize = WorldFeedLimits.DEFAULTS.TIMELINE_MENTIONS_PAGE_MAX_PAGE_SIZE;
        }

        public GetMentionsTimelineParameters(IGetMentionsTimelineParameters source) : base(source)
        {
            if (source == null)
            {
                PageSize = WorldFeedLimits.DEFAULTS.TIMELINE_MENTIONS_PAGE_MAX_PAGE_SIZE;
            }
        }

        public bool IncludeContributorDetails { get; set; }
    }
}
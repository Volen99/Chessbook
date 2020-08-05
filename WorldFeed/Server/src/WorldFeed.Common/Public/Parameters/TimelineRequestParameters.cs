﻿namespace WorldFeed.Common.Public.Parameters
{
    using WorldFeed.Common.Settings;

    public interface ITimelineRequestParameters : IMinMaxQueryParameters
    {
        /// <summary>
        /// If set to true, the creator property (IUser) will only contain the id.
        /// </summary>
        bool? TrimUser { get; set; }

        /// <summary>
        /// Include tweet entities.
        /// </summary>
        bool? IncludeEntities { get; set; }

        /// <summary>
        /// Decide whether to use Extended or Compat mode
        /// </summary>
        TweetMode? TweetMode { get; set; }
    }

    public abstract class TimelineRequestParameters : MinMaxQueryParameters, ITimelineRequestParameters
    {
        protected TimelineRequestParameters()
        {
        }

        protected TimelineRequestParameters(ITimelineRequestParameters source) : base(source)
        {
            TrimUser = source?.TrimUser;
            IncludeEntities = source?.IncludeEntities;
        }

        /// <inheritdoc/>
        public bool? TrimUser { get; set; }
        /// <inheritdoc/>
        public bool? IncludeEntities { get; set; }
        /// <inheritdoc/>
        public TweetMode? TweetMode { get; set; }
    }
}

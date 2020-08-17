namespace WorldFeed.Science.Upload.Data.Models.ExtendedFeedEntities
{
    using System.Collections.Generic;

    using WorldFeed.Common.Models;

    public class ExtendedEntities : BaseDeletableModel<long>
    {
        public List<MediaFeedEntity> Media { get; set; }

        public long FeedId { get; set; }
        public Feed Feed { get; set; }
    }
}

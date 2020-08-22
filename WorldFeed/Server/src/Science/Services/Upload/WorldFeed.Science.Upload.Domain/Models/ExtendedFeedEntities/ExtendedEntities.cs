namespace WorldFeed.Science.Upload.Domain.Models.ExtendedFeedEntities
{
    using System.Collections.Generic;
    using Microsoft.EntityFrameworkCore;

    [Owned]
    public class ExtendedEntities
    {
        public List<MediaFeedEntity> Media { get; set; }
    }
}

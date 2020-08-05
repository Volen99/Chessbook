using System;

namespace WorldFeed.Admin.Models.HistoryBCSciencePosts
{
    public class HistoryBCSciencePostOutputModel
    {
        public string Id { get; set; }

        public string UserId { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }
    }
}

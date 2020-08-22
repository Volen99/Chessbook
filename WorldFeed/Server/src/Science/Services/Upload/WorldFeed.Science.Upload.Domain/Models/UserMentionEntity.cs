namespace WorldFeed.Science.Upload.Domain.Models
{
    using Microsoft.EntityFrameworkCore;

    [Owned]
    public class UserMentionEntity
    {
        public string ScreenName { get; set; }

        public string Name { get; set; }

        public string Indices { get; set; }

    }
}

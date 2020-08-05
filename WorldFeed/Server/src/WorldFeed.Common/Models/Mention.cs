namespace WorldFeed.Common.Models
{
    using WorldFeed.Common.Public;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;
    using WorldFeed.Common.Settings;

    public class Mention : Tweet, IMention
    {
        public Mention(ITweetDTO tweetDTO, TweetMode? tweetMode, ITwitterClient client)
            : base(tweetDTO, tweetMode, client)
        {
            // Default constructor inheriting from the default Tweet constructor
        }

        public string Annotations { get; set; }
    }
}

namespace WorldFeed.Logic
{
    using WorldFeed.Common.Models;
    using WorldFeed.Common.Public;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;
    using WorldFeed.Common.Settings;

    public class TweetWithSearchMetadata : Tweet, ITweetWithSearchMetadata
    {
        private readonly ITweetWithSearchMetadataDTO tweetWithSearchMetadataDTO;

        public TweetWithSearchMetadata(ITweetWithSearchMetadataDTO tweetDTO, TweetMode? tweetMode, ITwitterClient client)
            : base(tweetDTO, tweetMode, client)
        {
            this.tweetWithSearchMetadataDTO = tweetDTO;
        }

        public ITweetFromSearchMetadata SearchMetadata => this.tweetWithSearchMetadataDTO.TweetFromSearchMetadata;
    }
}

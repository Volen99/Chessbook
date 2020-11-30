namespace Sharebook.Post.Domain.AggregatesModel.PostAggregate.TwitterEntities
{
    using System.Collections.Generic;
    using System.Linq;

    using Sharebook.Common.Settings;

    public class TweetEntities /*ValueObject*/
    {
       // private readonly ITweetDTO _tweetDTO;

        public TweetEntities(TweetMode tweetMode)
        {
           // _tweetDTO = tweetDTO;

            InitializeEntities(tweetMode);
        }

        private void InitializeEntities(TweetMode tweetMode)
        {
            // NOTE: The STREAMING API and REST API does not provide the same JSON structure based on the TweetMode used.
            // 
            // * STREAMING API : Adds a new ExtendedTweet regardless of the TweetMode. To have some consistency with the REST API,
            //   we decided that in COMPAT mode, the Entities will be restricted to what is available in the REST API.
            // * REST API : Adds FullText and additional properties if the TweetMode is extended.

            //var isTweetComingFromStreamingAPI = _tweetDTO?.ExtendedTweet != null;
            //var useStreamingApiExtendedTweetForEntities = tweetMode == TweetMode.Extended && isTweetComingFromStreamingAPI;

            //// Get the entities and extended_entities for whichever Tweet DTO we're using
            //var entities = useStreamingApiExtendedTweetForEntities ? _tweetDTO.ExtendedTweet.LegacyEntities : _tweetDTO?.LegacyEntities;
            //var extendedEntities = useStreamingApiExtendedTweetForEntities ? _tweetDTO.ExtendedTweet.ExtendedEntities : _tweetDTO?.Entities;

            // Populate for each type of entity.

            //Urls = entities?.Urls;
            //UserMentions = entities?.UserMentions;
            //Hashtags = entities?.Hashtags;
            //Symbols = entities?.Symbols;

            //// Media can also be in the extended_entities field. https://dev.twitter.com/overview/api/entities-in-twitter-objects#extended_entities
            //// If that's populated, we must use it instead or risk missing media
            //Medias = extendedEntities?.Medias ?? entities?.Medias ?? new List<IMediaEntity>();

            //// If this is a retweet, it's also now possible for an entity to get cut off of the end of the tweet entirely.
            //// If the same Tweet is fetched over the REST API, these entities get excluded, so lets do the same.
            //if (_tweetDTO?.RetweetedTweetDTO != null)
            //{
            //    Urls = Urls?.Where(e => e.Indices[0] != e.Indices[1]).ToList();
            //    UserMentions = UserMentions?.Where(e => e.Indices[0] != e.Indices[1]).ToList();
            //    Hashtags = Hashtags?.Where(e => e.Indices[0] != e.Indices[1]).ToList();
            //    Symbols = Symbols?.Where(e => e.Indices[0] != e.Indices[1]).ToList();
            //    Medias = Medias?.Where(e => e.Indices[0] != e.Indices[1]).ToList();
            //}
        }

        public List<UrlEntity> Urls { get; private set; }
        public List<UserMentionEntity> UserMentions { get; private set; }
        public List<HashtagEntity> Hashtags { get; private set; }
        public List<SymbolEntity> Symbols { get; private set; }
        public List<MediaEntity> Medias { get; private set; }
    }
}

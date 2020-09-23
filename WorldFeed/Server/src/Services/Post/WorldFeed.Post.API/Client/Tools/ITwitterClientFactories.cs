namespace WorldFeed.Post.Client.Tools
{
    using System.Collections.Generic;

    public interface ITwitterClientFactories
    {
        // TWEET

        /// <summary>
        /// Creates a tweet from json
        /// </summary>
        ITweet CreateTweet(string json);
        ITweet CreateTweet(ITweetDTO tweetDTO);
        ITweet[] CreateTweets(IEnumerable<ITweetDTO> tweetDTOs);
        ITweetWithSearchMetadata CreateTweetWithSearchMetadata(ITweetWithSearchMetadataDTO tweetWithSearchMetadataDTO);

        /// <summary>
        /// Creates a oembed tweet from json
        /// </summary>
        IOEmbedTweet CreateOEmbedTweet(string json);
        IOEmbedTweet CreateOEmbedTweet(IOEmbedTweetDTO oEmbedTweetDTO);



        // MEDIA

        /// <summary>
        /// Creates a media from json
        /// </summary>
        IMedia CreateMedia(string json);

        /// <summary>
        /// Creates uploaded media information from json
        /// </summary>
        IUploadedMediaInfo CreateUploadedMediaInfo(string json);

        // SEARCH

        /// <summary>
        /// Creates search results from json
        /// </summary>
        ISearchResults CreateSearchResult(string json);
    }
}
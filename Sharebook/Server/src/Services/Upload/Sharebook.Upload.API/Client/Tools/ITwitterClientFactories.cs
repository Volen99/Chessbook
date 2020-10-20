namespace Sharebook.Upload.Client.Tools
{
    using System.Collections.Generic;
    using Sharebook.Upload.Domain;
    using Sharebook.Upload.DTO;
    using Sharebook.Upload.Models.DTO;

    public interface ITwitterClientFactories
    {
        // MEDIA

        /// <summary>
        /// Creates a media from json
        /// </summary>
        IMedia CreateMedia(string json);

        /// <summary>
        /// Creates uploaded media information from json
        /// </summary>
        IUploadedMediaInfo CreateUploadedMediaInfo(string json);

        // TWEET

        /// <summary>
        /// Creates a tweet from json
        /// </summary>
        ITweet CreateTweet(string json);
        ITweet CreateTweet(ITweetDTO tweetDTO);
        ITweet[] CreateTweets(IEnumerable<ITweetDTO> tweetDTOs);
    }
}
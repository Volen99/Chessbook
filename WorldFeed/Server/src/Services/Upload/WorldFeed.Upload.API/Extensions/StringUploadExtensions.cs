namespace WorldFeed.Upload.API.Extensions
{
    using WorldFeed.Upload.API.Helpers;
    using WorldFeed.Upload.DTO;

    public static class StringUploadExtensions
    {
        /// <summary>
        /// Returns the different parts of an Extended Tweet string.
        /// </summary>
        public static ITweetTextParts TweetParts(this string tweetText)
        {
            return new TweetTextParts(tweetText);
        }
    }
}

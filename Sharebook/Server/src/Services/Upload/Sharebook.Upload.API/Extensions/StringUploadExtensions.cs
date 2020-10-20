namespace Sharebook.Upload.API.Extensions
{
    using Sharebook.Upload.API.Helpers;
    using Sharebook.Upload.DTO;

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

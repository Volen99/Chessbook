namespace WorldFeed.Upload.Properties
{
    // ReSharper disable InvalidXmlDocComment
    // ReSharper disable InconsistentNaming
    using WorldFeed.Common.Helpers;

    public static class Resources
    {
        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/statuses/update.json?.
        /// </summary>
        public static string Tweet_Publish = "https://api.twitter.com/1.1/statuses/update.json?";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/statuses/retweets/{0}.json.
        /// </summary>
        public static string Tweet_Retweet_GetRetweets = "https://api.twitter.com/1.1/statuses/retweets/{0}.json";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/statuses/unretweet/{0}.json.
        /// </summary>
        public static string Tweet_DestroyRetweet = "https://api.twitter.com/1.1/statuses/unretweet/{0}.json";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/statuses/retweet/{0}.json.
        /// </summary>
        public static string Tweet_Retweet_Publish = "https://api.twitter.com/1.1/statuses/retweet/{0}.json";

        /// <summary>
        ///   Looks up a localized string similar to https://upload.twitter.com/1.1/media/upload.json.
        /// </summary>
        public static string Upload_URL = "https://localhost:5002/media/chunk";                   // "https://upload.twitter.com/1.1/media/upload.json";

        /// <summary>
        ///   Looks up a localized string similar to Upload STATUS can only be retrieved for uploaded media. The FINALIZE query must be invoked.
        /// </summary>
        public static string Exception_Upload_Status_NotUploaded = "Upload STATUS can only be retrieved for uploaded media. The FINALIZE query must be invoked.";

        /// <summary>
        ///   Looks up a localized string similar to Upload STATUS can only be invoked on uploads with processing metadata. Set the `media_category` to `tweet_video` to solve this issue.
        /// </summary>
        public static string Exception_Upload_Status_No_ProcessingInfo = "Upload STATUS can only be invoked on uploads with processing metadata. Set the `media_category` to `tweet_video` to solve this issue.";

        public static string GetResourceByName(string resourceName)
        {
            return ResourcesHelper.GetResourceByType(typeof(Resources), resourceName);
        }
    }
}

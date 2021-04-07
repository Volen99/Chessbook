namespace Chessbook.Web.Api.Properties
{
    public static class Resources
    {
        public static string ROOT = "./Files";

        public static string IMAGES_PATH = "~/Images/{0}/{1}_{2}.jpg";

        public static string GIFS_PATH = "~/Gifs/{0}/{1}_{2}.jpg";

        public static string VIDEO_PATH = "~/Videos/{0}/{1}_{2}.jpg";

        public static string BLOG_IMAGES_PATH = "~/Images/Blog/{0}/{1}_{2}.jpg";

        /// <summary>
        ///   Looks up a localized string similar to Upload STATUS can only be retrieved for uploaded media. The FINALIZE query must be invoked.
        /// </summary>
        public static string Exception_Upload_Status_NotUploaded = "Upload STATUS can only be retrieved for uploaded media. The FINALIZE query must be invoked.";

        /// <summary>
        ///   Looks up a localized string similar to Upload STATUS can only be invoked on uploads with processing metadata. Set the `media_category` to `tweet_video` to solve this issue.
        /// </summary>
        public static string Exception_Upload_Status_No_ProcessingInfo = "Upload STATUS can only be invoked on uploads with processing metadata. Set the `media_category` to `tweet_video` to solve this issue.";
    }
}

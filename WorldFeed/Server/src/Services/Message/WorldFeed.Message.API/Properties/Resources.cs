namespace WorldFeed.Message.Properties
{
    using WorldFeed.Common.Helpers;

    public static class Resources
    {
        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/direct_messages/events/list.json.
        /// </summary>
        public static string Message_GetMessages = "https://api.twitter.com/1.1/direct_messages/events/list.json";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/direct_messages/events/new.json.
        /// </summary>
        public static string Message_Create = "https://api.twitter.com/1.1/direct_messages/events/new.json";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/direct_messages/show.json?.
        /// </summary>
        public static string Message_Get = "https://api.twitter.com/1.1/direct_messages/events/show.json?";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/direct_messages/events/destroy.json?.
        /// </summary>
        public static string Message_Destroy = "https://api.twitter.com/1.1/direct_messages/events/destroy.json?";

        public static string GetResourceByName(string resourceName)
        {
            return ResourcesHelper.GetResourceByType(typeof(Resources), resourceName);
        }
    }
}

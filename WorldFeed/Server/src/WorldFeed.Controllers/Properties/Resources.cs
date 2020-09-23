namespace WorldFeed.Controllers.Properties
{
    // ReSharper disable InvalidXmlDocComment
    // ReSharper disable InconsistentNaming
    using WorldFeed.Common.Helpers;

    public static class Resources
    {
        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/friendships/create.json?{0}.
        /// </summary>
        public static string Friendship_Create = "https://api.twitter.com/1.1/friendships/create.json?";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/friendships/destroy.json?{0}.
        /// </summary>
        public static string Friendship_Destroy = "https://api.twitter.com/1.1/friendships/destroy.json?";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/friendships/no_retweets/ids.json.
        /// </summary>
        public static string Friendship_FriendIdsWithNoRetweets = "https://api.twitter.com/1.1/friendships/no_retweets/ids.json";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/friendships/incoming.json?.
        /// </summary>
        public static string Friendship_GetIncomingIds = "https://api.twitter.com/1.1/friendships/incoming.json?";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/friendships/outgoing.json?.
        /// </summary>
        public static string Friendship_GetOutgoingIds = "https://api.twitter.com/1.1/friendships/outgoing.json?";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/friendships/show.json?.
        /// </summary>
        public static string Friendship_GetRelationship = "https://api.twitter.com/1.1/friendships/show.json?";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/friendships/lookup.json?.
        /// </summary>
        public static string Friendship_GetRelationships = "https://api.twitter.com/1.1/friendships/lookup.json?";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/friendships/update.json?.
        /// </summary>
        public static string Friendship_Update = "https://api.twitter.com/1.1/friendships/update.json?";

        /// <summary>
        ///   Looks up a localized string similar to long={0}&amp;lat={1}.
        /// </summary>
        public static string Geo_CoordinatesParameter = "long={0}&lat={1}";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/geo/id/{0}.json.
        /// </summary>
        public static string Geo_GetPlaceFromId = "https://api.twitter.com/1.1/geo/id/{0}.json";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/geo/search.json.
        /// </summary>
        public static string Geo_SearchGeo = "https://api.twitter.com/1.1/geo/search.json";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/geo/reverse_geocode.json.
        /// </summary>
        public static string Geo_SearchGeoReverse = "https://api.twitter.com/1.1/geo/reverse_geocode.json";

        /// <summary>
        ///   Looks up a localized string similar to place_id={0}.
        /// </summary>
        public static string Geo_PlaceIdParameter = "place_id={0}";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/application/rate_limit_status.json.
        /// </summary>
        public static string Help_GetRateLimit = "https://api.twitter.com/1.1/application/rate_limit_status.json";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/help/configuration.json.
        /// </summary>
        public static string Help_GetTwitterConfiguration = "https://api.twitter.com/1.1/help/configuration.json";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/help/languages.json.
        /// </summary>
        public static string Help_GetSupportedLanguages = "https://api.twitter.com/1.1/help/languages.json";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/account_activity/all.
        /// </summary>
        public static string Webhooks_AccountActivity_All = "https://api.twitter.com/1.1/account_activity/all";

        /// <summary>
        ///   Looks up a localized string similar to /webhooks.json?.
        /// </summary>
        public static string Webhooks_AccountActivity_GetAllWebhooks = "https://api.twitter.com/1.1/account_activity/all/webhooks.json";

        public static string GetResourceByName(string resourceName)
        {
            return ResourcesHelper.GetResourceByType(typeof(Resources), resourceName);
        }
    }
}

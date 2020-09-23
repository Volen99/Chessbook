namespace WorldFeed.Search.Properties
{
    using WorldFeed.Common.Helpers;

    public static class Resources
    {
        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/saved_searches/create.json?.
        /// </summary>
        public static string SavedSearch_Create = "https://api.twitter.com/1.1/saved_searches/create.json?";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/saved_searches/show/{0}.json.
        /// </summary>
        public static string SavedSearch_Get = "https://api.twitter.com/1.1/saved_searches/show/{0}.json";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/saved_searches/destroy/{0}.json.
        /// </summary>
        public static string SavedSearch_Destroy = "https://api.twitter.com/1.1/saved_searches/destroy/{0}.json";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/saved_searches/list.json.
        /// </summary>
        public static string SavedSearches_List = "https://api.twitter.com/1.1/saved_searches/list.json";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/search/tweets.json.
        /// </summary>
        public static string Search_SearchTweets = "https://api.twitter.com/1.1/search/tweets.json";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/users/search.json.
        /// </summary>
        public static string Search_SearchUsers = "https://api.twitter.com/1.1/users/search.json";

        /// <summary>
        ///   Looks up a localized string similar to {0},{1},{2}{3}.
        /// </summary>
        public static string SearchParameter_GeoCode = "{0},{1},{2}{3}";

        public static string GetResourceByName(string resourceName)
        {
            return ResourcesHelper.GetResourceByType(typeof(Resources), resourceName);
        }
    }
}

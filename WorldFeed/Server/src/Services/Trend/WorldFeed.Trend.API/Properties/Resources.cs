namespace WorldFeed.Trends.Properties
{
    using WorldFeed.Common.Helpers;

    public static class Resources
    {
        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/trends/place.json?.
        /// </summary>
        public static string Trends_GetTrendsFromWoeId = "https://api.twitter.com/1.1/trends/place.json?";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/trends/available.json.
        /// </summary>
        public static string Trends_GetAvailableTrendsLocations = "https://api.twitter.com/1.1/trends/available.json";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/trends/closest.json.
        /// </summary>
        public static string Trends_GetTrendsLocationCloseTo = "https://api.twitter.com/1.1/trends/closest.json";

        public static string GetResourceByName(string resourceName)
        {
            return ResourcesHelper.GetResourceByType(typeof(Resources), resourceName);
        }
    }
}

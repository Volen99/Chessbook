namespace Sharebook.Post.API.Properties
{
    using Sharebook.Common.Helpers;

    // ReSharper disable InvalidXmlDocComment
    // ReSharper disable InconsistentNaming

    public static class Resources
    {
        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/statuses/destroy/{0}.json.
        /// </summary>
        public static string Tweet_Destroy = "https://api.twitter.com/1.1/statuses/destroy/{0}.json";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/favorites/create.json?.
        /// </summary>
        public static string Tweet_Favorite_Create = "https://api.twitter.com/1.1/favorites/create.json?";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/favorites/destroy.json?.
        /// </summary>
        public static string Tweet_Favorite_Destroy = "https://api.twitter.com/1.1/favorites/destroy.json?";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/statuses/oembed.json?.
        /// </summary>
        public static string Tweet_GenerateOEmbed = "https://api.twitter.com/1.1/statuses/oembed.json?";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/statuses/show.json?.
        /// </summary>
        public static string Tweet_Get = "https://api.twitter.com/1.1/statuses/show.json?";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/statuses/retweeters/ids.json.
        /// </summary>
        public static string Tweet_GetRetweeters = "https://api.twitter.com/1.1/statuses/retweeters/ids.json";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/statuses/lookup.json?.
        /// </summary>
        public static string Tweet_Lookup = "https://api.twitter.com/1.1/statuses/lookup.json?";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/statuses/retweets/{0}.json.
        /// </summary>
        public static string Tweet_Retweet_GetRetweets = "https://api.twitter.com/1.1/statuses/retweets/{0}.json";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/statuses/unretweet/{0}.json.
        /// </summary>
        public static string Tweet_DestroyRetweet = "https://api.twitter.com/1.1/statuses/unretweet/{0}.json";

        /// <summary>
        ///   Looks up a localized string similar to &amp;count={0}.
        /// </summary>
        public static string QueryParameter_Count = "&count={0}";

        /// <summary>
        ///   Looks up a localized string similar to &amp;include_entities={0}.
        /// </summary>
        public static string QueryParameter_IncludeEntities = "&include_entities={0}";

        /// <summary>
        ///   Looks up a localized string similar to &amp;include_rts={0}.
        /// </summary>
        public static string QueryParameter_IncludeRetweets = "&include_rts={0}";

        /// <summary>
        ///   Looks up a localized string similar to &amp;max_id={0}.
        /// </summary>
        public static string QueryParameter_MaxId = "&max_id={0}";

        /// <summary>
        ///   Looks up a localized string similar to &amp;page_number={0}.
        /// </summary>
        public static string QueryParameter_PageNumber = "&page_number={0}";

        /// <summary>
        ///   Looks up a localized string similar to &amp;since_id={0}.
        /// </summary>
        public static string QueryParameter_SinceId = "&since_id={0}";

        /// <summary>
        ///   Looks up a localized string similar to &amp;skip_status={0}.
        /// </summary>
        public static string QueryParameter_SkipStatus = "&skip_status={0}";

        /// <summary>
        ///   Looks up a localized string similar to &amp;trim_user={0}.
        /// </summary>
        public static string QueryParameter_TrimUser = "&trim_user={0}";

        /// <summary>
        ///   Looks up a localized string similar to &amp;cursor={0}.
        /// </summary>
        public static string QueryParameter_Cursor = "&cursor={0}";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/favorites/list.json?{0}&amp;count={1}.
        /// </summary>
        public static string User_GetFavorites = "https://api.twitter.com/1.1/favorites/list.json?";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/statuses/home_timeline.json?.
        /// </summary>
        public static string Timeline_GetHomeTimeline = "https://api.twitter.com/1.1/statuses/home_timeline.json?";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/statuses/mentions_timeline.json?.
        /// </summary>
        public static string Timeline_GetMentionsTimeline = "https://api.twitter.com/1.1/statuses/mentions_timeline.json?";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/statuses/retweets_of_me.json?.
        /// </summary>
        public static string Timeline_GetRetweetsOfMeTimeline = "https://api.twitter.com/1.1/statuses/retweets_of_me.json?";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/statuses/user_timeline.json?.
        /// </summary>
        public static string Timeline_GetUserTimeline = "https://api.twitter.com/1.1/statuses/user_timeline.json?";

        public static string GetResourceByName(string resourceName)
        {
            return ResourcesHelper.GetResourceByType(typeof(Resources), resourceName);
        }
    }
}

namespace WorldFeed.Book.Properties
{
    using WorldFeed.Common.Helpers;

    public static class Resources
    {
        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/lists/create.json?.
        /// </summary>
        public static string List_Create = "https://api.twitter.com/1.1/lists/create.json?";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/lists/show.json?.
        /// </summary>
        public static string List_Get = "https://api.twitter.com/1.1/lists/show.json?";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/lists/list.json?.
        /// </summary>
        public static string List_GetUserLists = "https://api.twitter.com/1.1/lists/list.json?";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/lists/update.json?.
        /// </summary>
        public static string List_Update = "https://api.twitter.com/1.1/lists/update.json";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/lists/destroy.json?.
        /// </summary>
        public static string List_Destroy = "https://api.twitter.com/1.1/lists/destroy.json?";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/lists/members/create.json?.
        /// </summary>
        public static string List_Members_Create = "https://api.twitter.com/1.1/lists/members/create.json?";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/lists/members.json?.
        /// </summary>
        public static string List_Members_List = "https://api.twitter.com/1.1/lists/members.json?";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/lists/members/show.json?.
        /// </summary>
        public static string List_CheckMembership = "https://api.twitter.com/1.1/lists/members/show.json?";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/lists/members/create_all.json?.
        /// </summary>
        public static string List_CreateMembers = "https://api.twitter.com/1.1/lists/members/create_all.json?";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/lists/members/destroy.json?.
        /// </summary>
        public static string List_DestroyMember = "https://api.twitter.com/1.1/lists/members/destroy.json?";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/lists/members/destroy_all.json?.
        /// </summary>
        public static string List_DestroyMembers = "https://api.twitter.com/1.1/lists/members/destroy_all.json?";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/lists/subscribers.json?.
        /// </summary>
        public static string List_GetSubscribers = "https://api.twitter.com/1.1/lists/subscribers.json?";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/lists/statuses.json?.
        /// </summary>
        public static string List_GetTweetsFromList = "https://api.twitter.com/1.1/lists/statuses.json?";

        /// <summary>
        ///   Looks up a localized string similar to &amp;owner_id={0}.
        /// </summary>
        public static string List_OwnerIdParameter = "&owner_id={0}";

        /// <summary>
        ///   Looks up a localized string similar to &amp;owner_screen_name={0}.
        /// </summary>
        public static string List_OwnerScreenNameParameter = "&owner_screen_name={0}";

        /// <summary>
        /// Looks up a localized string similar to https://api.twitter.com/1.1/lists/memberships.json?.
        /// </summary>
        public static string List_GetUserMemberships = "https://api.twitter.com/1.1/lists/memberships.json?";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/lists/ownerships.json?.
        /// </summary>
        public static string List_OwnedByUser = "https://api.twitter.com/1.1/lists/ownerships.json?";

        /// <summary>
        ///   Looks up a localized string similar to &amp;slug={0}.
        /// </summary>
        public static string List_SlugParameter = "&slug={0}";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/lists/subscribers/create.json?.
        /// </summary>
        public static string List_Subscribe = "https://api.twitter.com/1.1/lists/subscribers/create.json?";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/lists/subscribers/destroy.json?.
        /// </summary>
        public static string List_Unsubscribe = "https://api.twitter.com/1.1/lists/subscribers/destroy.json?";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/lists/subscriptions.json?.
        /// </summary>
        public static string List_UserSubscriptions = "https://api.twitter.com/1.1/lists/subscriptions.json?";

        /// <summary>
        ///   Looks up a localized string similar tohttps://api.twitter.com/1.1/lists/subscribers/show.json.
        /// </summary>
        public static string List_CheckSubscriber = "https://api.twitter.com/1.1/lists/subscribers/show.json";

        public static string GetResourceByName(string resourceName)
        {
            return ResourcesHelper.GetResourceByType(typeof(Resources), resourceName);
        }
    }
}

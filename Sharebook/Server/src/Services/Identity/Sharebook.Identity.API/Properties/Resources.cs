namespace Sharebook.Identity.API.Properties
{
    // ReSharper disable InvalidXmlDocComment
    // ReSharper disable InconsistentNaming
    using Sharebook.Common.Helpers;

    public static class Resources
    {
        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/account/settings.json.
        /// </summary>
        public static string Account_GetSettings = "https://localhost:5013/account/settings"; // was https://api.twitter.com/1.1/account/settings.json

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/mutes/users/create.json?.
        /// </summary>
        public static string Account_Mute_Create = "https://api.twitter.com/1.1/mutes/users/create.json?";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/mutes/users/destroy.json?.
        /// </summary>
        public static string Account_Mute_Destroy = "https://api.twitter.com/1.1/mutes/users/destroy.json?";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/mutes/users/ids.json?.
        /// </summary>
        public static string Account_Mute_GetUserIds = "https://api.twitter.com/1.1/mutes/users/ids.json?";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/mutes/users/ids.json?.
        /// </summary>
        public static string Account_Mute_GetUsers = "https://api.twitter.com/1.1/mutes/users/list.json?";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/account/settings.json?.
        /// </summary>
        public static string Account_UpdateSettings = "https://localhost:5013/account/settings"; // was "https://api.twitter.com/1.1/account/settings.json?";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/account/update_profile.json.
        /// </summary>
        public static string Account_UpdateProfile = "https://api.twitter.com/1.1/account/update_profile.json";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/account/update_profile_image.json.
        /// </summary>
        public static string Account_UpdateProfileImage = "https://api.twitter.com/1.1/account/update_profile_image.json";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/account/update_profile_banner.json.
        /// </summary>
        public static string Account_UpdateProfileBanner = "https://api.twitter.com/1.1/account/update_profile_banner.json";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/account/remove_profile_banner.json.
        /// </summary>
        public static string Account_RemoveProfileBanner = "https://api.twitter.com/1.1/account/remove_profile_banner.json";

        /// <summary>
        ///   Looks up a localized string similar to oob.
        /// </summary>
        public static string Auth_PinCodeUrl = "oob";

        /// <summary>
        ///   Looks up a localized string similar to authorization_id.
        /// </summary>
        public static string Auth_ProcessIdKey = "authorization_id";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/oauth/request_token.
        /// </summary>
        public static string Auth_CreateBearerToken = "https://api.twitter.com/oauth2/token";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/oauth/request_token.
        /// </summary>
        public static string Auth_RequestToken = "https://api.twitter.com/oauth/request_token";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/oauth/access_token.
        /// </summary>
        public static string Auth_RequestAccessToken = "https://api.twitter.com/oauth/access_token";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/oauth/authorize.
        /// </summary>
        public static string Auth_AuthorizeBaseUrl = "https://api.twitter.com/oauth/authorize";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/oauth2/invalidate_token.
        /// </summary>
        public static string Auth_InvalidateBearerToken = "https://api.twitter.com/oauth2/invalidate_token";

        /// <summary>
        ///   Looks up a localized string similar to https://api.twitter.com/1.1/oauth/invalidate_token.
        /// </summary>
        public static string Auth_InvalidateAccessToken = "https://api.twitter.com/1.1/oauth/invalidate_token";

        /// <summary>
        ///   Looks up a localized string that contains the regex for parsing the oauth_token
        /// </summary>
        public static string Auth_RequestTokenParserRegex = "oauth_token=(?<oauth_token>(?:\\w|\\-)*)&oauth_token_secret=(?<oauth_token_secret>(?:\\w)*)&oauth_callback_confirmed=(?<oauth_callback_confirmed>(?:\\w)*)";

        public static string GetResourceByName(string resourceName)
        {
            return ResourcesHelper.GetResourceByType(typeof(Resources), resourceName);
        }
    }
}

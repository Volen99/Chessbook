namespace WorldFeed.Common.Public.Parameters.Auth
{
    /// <summary>
    /// For more information visit : https://developer.twitter.com/en/docs/basics/authentication/api-reference/request_token
    /// </summary>
    public interface IRequestAuthUrlParameters : ICustomRequestParameters
    {
        /// <summary>
        /// The url Twitter will redirect to after attempting to authenticate the user
        /// If not specified the user will not be redirected but will obtain a code to use to validate the authentications.
        /// </summary>
        string CallbackUrl { get; set; }

        /// <summary>
        /// Forces the user to enter their credentials to ensure the correct users account is authorized.
        /// </summary>
        bool? ForceLogin { get; set; }

        /// <summary>
        /// Prefill the username input box of the Twitter login screen with the given value.
        /// </summary>
        string ScreenName { get; set; }

        /// <summary>
        /// Overrides the access level an application requests to a users account. Supported values are read or write.
        /// This parameter is intended to allow a developer to register a read/write application but also
        /// request read only access when appropriate.
        /// </summary>
        AuthAccessType? AuthAccessType { get; set; }
    }
}

namespace Sharebook.Profile.Application.Parameters.AccountClient
{
    using Sharebook.Common.Public.Parameters.Optionals;
    using Sharebook.Common.Settings;

    /// <summary>
    /// For more information visit : https://dev.twitter.com/rest/reference/get/account/verify_credentials
    /// </summary>
    /// <inheritdoc />
    public interface IGetAuthenticatedUserParameters : IGetUsersOptionalParameters
    {
        /// <summary>
        /// Include the email of the user. This is only available if the application
        /// has been verified and approved by Twitter.
        /// </summary>
        bool? IncludeEmail { get; set; }

        /// <summary>
        /// Decide whether to use Extended or Compat mode
        /// </summary>
        TweetMode? TweetMode { get; set; }
    }

    /// <inheritdoc />
    public class GetAuthenticatedUserParameters : GetUsersOptionalParameters, IGetAuthenticatedUserParameters
    {
        public GetAuthenticatedUserParameters()
        {
            IncludeEmail = true;
        }

        public GetAuthenticatedUserParameters(IGetAuthenticatedUserParameters parameters) : base(parameters)
        {
            IncludeEmail = parameters?.IncludeEmail;
        }

        /// <inheritdoc/>
        public bool? IncludeEmail { get; set; }
        /// <inheritdoc/>
        public TweetMode? TweetMode { get; set; }
    }
}

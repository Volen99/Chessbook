namespace WorldFeed.Identity.API.Application.Parameters
{
    using WorldFeed.Common.Public.Parameters;

    /// <summary>
    /// For more information visit : https://dev.twitter.com/en/docs/accounts-and-users/manage-account-settings/api-reference/get-account-settings
    /// </summary>
    public interface IGetAccountSettingsParameters : ICustomRequestParameters
    {
    }

    /// <inheritdoc/>
    public class GetAccountSettingsParameters : CustomRequestParameters, IGetAccountSettingsParameters
    {
    }
}

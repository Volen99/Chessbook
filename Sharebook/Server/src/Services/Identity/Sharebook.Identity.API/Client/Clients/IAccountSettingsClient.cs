namespace Sharebook.Identity.API.Client.Clients
{
    using System.Threading.Tasks;

    using Sharebook.Common.Client.Validators;
    using Sharebook.Identity.API.Application.Parameters;
    using Sharebook.Identity.API.Models;
    using Sharebook.Identity.Domain.AggregatesModel.UserAggregate;

    /// <summary>
    /// A client providing all the actions relative to the account settings
    /// </summary>
    public interface IAccountSettingsClient
    {
        /// <summary>
        /// Validate all the AccountSettings client parameters
        /// </summary>
        IAccountSettingsClientParametersValidator ParametersValidator { get; }

        /// <inheritdoc cref="IAccountSettingsClient.GetAccountSettingsAsync(IGetAccountSettingsParameters)" />
        Task<IAccountSettings> GetAccountSettingsAsync();

        /// <summary>
        /// Get the client's account settings
        /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/manage-account-settings/api-reference/get-account-settings </para>
        /// </summary>
        /// <returns>Account settings</returns>
        Task<IAccountSettings> GetAccountSettingsAsync(IGetAccountSettingsParameters parameters);

        /// <summary>
        /// Update the client's account settings
        /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/manage-account-settings/api-reference/post-account-settings </para>
        /// </summary>
        /// <returns>Updated account settings</returns>
        Task<IAccountSettings> UpdateAccountSettingsAsync(IUpdateAccountSettingsParameters parameters);

        /// <summary>
        /// Update the client's account profile
        /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/manage-account-settings/api-reference/post-account-update_profile </para>
        /// </summary>
        /// <returns>Updated profile</returns>
        Task<IAuthenticatedUser> UpdateProfileAsync(IUpdateProfileParameters parameters);

        /// <inheritdoc cref="IAccountSettingsClient.UpdateProfileImageAsync(IUpdateProfileImageParameters)" />
        Task<IUser> UpdateProfileImageAsync(byte[] binary);

        /// <summary>
        /// Update the profile image of the account
        /// <para>Read more : https://dev.twitter.com/rest/reference/post/account/update_profile_image</para>
        /// </summary>
        Task<IUser> UpdateProfileImageAsync(IUpdateProfileImageParameters parameters);

        /// <inheritdoc cref="IAccountSettingsClient.UpdateProfileBannerAsync(IUpdateProfileBannerParameters)" />
        Task UpdateProfileBannerAsync(byte[] binary);

        /// <summary>
        /// Update the profile banner of the account
        /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/manage-account-settings/api-reference/post-account-update_profile_banner </para>
        /// </summary>
        Task UpdateProfileBannerAsync(IUpdateProfileBannerParameters parameters);

        /// <inheritdoc cref="IAccountSettingsClient.RemoveProfileBannerAsync(IRemoveProfileBannerParameters)" />
        Task RemoveProfileBannerAsync();

        /// <summary>
        /// Remove the profile banner of the account
        /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/manage-account-settings/api-reference/post-account-remove_profile_banner </para>
        /// </summary>
        Task RemoveProfileBannerAsync(IRemoveProfileBannerParameters parameters);
    }
}

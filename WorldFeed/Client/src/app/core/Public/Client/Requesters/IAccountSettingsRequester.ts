import {ITwitterResult} from "../../../Core/Web/TwitterResult";
import {IGetAccountSettingsParameters} from "../../Parameters/AccountSettingsClient/GetAccountSettingsParameters";
import {IAccountSettingsDTO} from "../../Models/Interfaces/DTO/IAccountSettingsDTO";
import {IUpdateAccountSettingsParameters} from "../../Parameters/AccountSettingsClient/UpdateAccountSettingsParameters";
import {IUpdateProfileParameters} from "../../Parameters/AccountSettingsClient/UpdateProfileParameters";
import {IUserDTO} from "../../Models/Interfaces/DTO/IUserDTO";
import {IUpdateProfileImageParameters} from "../../Parameters/AccountSettingsClient/UpdateProfileImageParameters";
import {IUpdateProfileBannerParameters} from "../../Parameters/AccountSettingsClient/UpdateProfileBannerParameters";
import {IRemoveProfileBannerParameters} from "../../Parameters/AccountSettingsClient/RemoveProfileBannerParameters";

// A client providing all the actions relative to the account settings
// The results from this client contain additional metadata.
export interface IAccountSettingsRequester {
  /// <summary>
  /// Get the client's account settings
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/manage-account-settings/api-reference/get-account-settings </para>
  /// </summary>
  /// <returns>Twitter result containing the account settings</returns>
  getAccountSettingsAsync(parameters: IGetAccountSettingsParameters): Promise<ITwitterResult<IAccountSettingsDTO>>;

  /// <summary>
  /// Update the client's account settings
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/manage-account-settings/api-reference/post-account-settings </para>
  /// </summary>
  /// <returns>Twitter result containing the updated account settings</returns>
  updateAccountSettingsAsync(parameters: IUpdateAccountSettingsParameters): Promise<ITwitterResult<IAccountSettingsDTO>>;

  /// <summary>
  /// Update the client's account profile
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/manage-account-settings/api-reference/post-account-update_profile </para>
  /// </summary>
  /// <returns>Twitter result containing the updated authenticated user</returns>
  updateProfileAsync(parameters: IUpdateProfileParameters): Promise<ITwitterResult<IUserDTO>>;

  /// <summary>
  /// Update the profile image of the account
  /// <para>https://dev.twitter.com/rest/reference/post/account/update_profile_image</para>
  /// </summary>
  /// <returns>Twitter result containing the updated user</returns>
  updateProfileImageAsync(parameters: IUpdateProfileImageParameters): Promise<ITwitterResult<IUserDTO>>;

  /// <summary>
  /// Update the profile banner of the account
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/manage-account-settings/api-reference/post-account-update_profile_banner </para>
  /// </summary>
  /// <returns>Twitter result</returns>
  updateProfileBannerAsync(parameters: IUpdateProfileBannerParameters): Promise<ITwitterResult>;

  /// <summary>
  /// Remove the profile banner of the account
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/manage-account-settings/api-reference/post-account-remove_profile_banner </para>
  /// </summary>
  /// <returns>Twitter result</returns>
  removeProfileBannerAsync(parameters: IRemoveProfileBannerParameters): Promise<ITwitterResult>;
}

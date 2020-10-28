import {Inject, InjectionToken} from "@angular/core";

import {IAccountSettingsClientParametersValidator} from "../../../Core/Client/Validators/AccountSettingsClientParametersValidator";
import {IAccountSettings} from "../../Models/Interfaces/IAccountSettings";
import {IGetAccountSettingsParameters} from "../../Parameters/AccountSettingsClient/GetAccountSettingsParameters";
import {IUpdateAccountSettingsParameters} from "../../Parameters/AccountSettingsClient/UpdateAccountSettingsParameters";
import {IUpdateProfileParameters} from "../../Parameters/AccountSettingsClient/UpdateProfileParameters";
import {IAuthenticatedUser} from "../../Models/Interfaces/IAuthenticatedUser";
import {IUpdateProfileImageParameters} from "../../Parameters/AccountSettingsClient/UpdateProfileImageParameters";
import {IUpdateProfileBannerParameters} from "../../Parameters/AccountSettingsClient/UpdateProfileBannerParameters";
import {IRemoveProfileBannerParameters} from "../../Parameters/AccountSettingsClient/RemoveProfileBannerParameters";
import {IUser} from "../../Models/Interfaces/IUser";
import {AccountSettingsClient} from "../../../../sharebook/Client/Clients/AccountSettingsClient";
import {TwitterClient} from "../../../../sharebook/TwitterClient";

// A client providing all the actions relative to the account settings
export interface IAccountSettingsClient {
  // Validate all the AccountSettings client parameters
  parametersValidator: IAccountSettingsClientParametersValidator;

  getAccountSettingsAsync(): Promise<IAccountSettings>;

  /// <summary>
  /// Get the client's account settings
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/manage-account-settings/api-reference/get-account-settings </para>
  /// </summary>
  /// <returns>Account settings</returns>
  getAccountSettingsAsync(parameters: IGetAccountSettingsParameters): Promise<IAccountSettings>;

  /// <summary>
  /// Update the client's account settings
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/manage-account-settings/api-reference/post-account-settings </para>
  /// </summary>
  /// <returns>Updated account settings</returns>
  updateAccountSettingsAsync(parameters: IUpdateAccountSettingsParameters): Promise<IAccountSettings>;

  /// <summary>
  /// Update the client's account profile
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/manage-account-settings/api-reference/post-account-update_profile </para>
  /// </summary>
  /// <returns>Updated profile</returns>
  updateProfileAsync(parameters: IUpdateProfileParameters): Promise<IAuthenticatedUser>;

  updateProfileImageAsync(binary: number[]): Promise<IUser>;

  /// <summary>
  /// Update the profile image of the account
  /// <para>Read more : https://dev.twitter.com/rest/reference/post/account/update_profile_image</para>
  /// </summary>
  updateProfileImageAsync(parameters: IUpdateProfileImageParameters): Promise<IUser>;

  updateProfileBannerAsync(binary: number[]): Promise<void>;

  /// <summary>
  /// Update the profile banner of the account
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/manage-account-settings/api-reference/post-account-update_profile_banner </para>
  /// </summary>
  updateProfileBannerAsync(parameters: IUpdateProfileBannerParameters): Promise<void>;

  removeProfileBannerAsync(): Promise<void>;

  /// <summary>
  /// Remove the profile banner of the account
  /// <para>Read more : https://dev.twitter.com/en/docs/accounts-and-users/manage-account-settings/api-reference/post-account-remove_profile_banner </para>
  /// </summary>
  removeProfileBannerAsync(parameters: IRemoveProfileBannerParameters): Promise<void>;
}

export const IAccountSettingsClientToken = new InjectionToken<IAccountSettingsClient>('IAccountSettingsClient', {
  providedIn: 'root',
  factory: () => new AccountSettingsClient(Inject(TwitterClient)),
});

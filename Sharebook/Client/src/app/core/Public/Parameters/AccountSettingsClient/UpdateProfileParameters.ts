import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";

// For more information visit: https://dev.twitter.com/en/docs/accounts-and-users/manage-account-settings/api-reference/post-account-update_profile
export interface IUpdateProfileParameters extends ICustomRequestParameters {
  // Full name associated with the profile. Maximum of 50 characters.
  name: string;

  // URL associated with the profile. Will be prepended with “http://” if not present. Maximum of 100 characters.
  websiteUrl: string;

  // The city or country describing where the user of the account is located. The contents are not normalized or geocoded in any way.
  // Maximum of 30 characters.
  location: string;

  // A description/bio of the user owning the account. Maximum of 160 characters.
  description: string;

  // Sets a hex value that controls the color scheme of links used on the authenticating user’s profile page on twitter.com.
  // This must be a valid hexadecimal value, and may be either three or six characters (ex: F00 or FF0000).
  profileLinkColor: string;

  // The entities node will not be included when set to false.
  includeEntities?: boolean;

  // When set to true, statuses will not be included in the returned user objects.
  skipStatus?: boolean;
}

export class UpdateProfileParameters extends CustomRequestParameters implements IUpdateProfileParameters {
  constructor() {
    super();
    this.includeEntities = true;
    this.skipStatus = false;
  }

  public name: string;
  public description: string;
  public location: string;
  public websiteUrl: string;

  public profileLinkColor: string;
  public includeEntities?: boolean;
  public skipStatus?: boolean;
}

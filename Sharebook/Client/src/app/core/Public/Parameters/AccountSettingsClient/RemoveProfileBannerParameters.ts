import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";

// For more information visit: https://dev.twitter.com/en/docs/accounts-and-users/manage-account-settings/api-reference/post-account-remove_profile_banner
export interface IRemoveProfileBannerParameters extends ICustomRequestParameters {
}

export class RemoveProfileBannerParameters extends CustomRequestParameters implements IRemoveProfileBannerParameters {
}

// For more information visit : https://dev.twitter.com/en/docs/accounts-and-users/manage-account-settings/api-reference/get-account-settings
import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";

export interface IGetAccountSettingsParameters extends ICustomRequestParameters {
}

export class GetAccountSettingsParameters extends CustomRequestParameters implements IGetAccountSettingsParameters {
}

import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";

// For more information visit: https://developer.twitter.com/en/docs/accounts-and-users/subscribe-account-activity/api-reference/aaa-premium#get-account-activity-all-webhooks
export interface IGetAccountActivityWebhookEnvironmentsParameters extends ICustomRequestParameters {
}

export class GetAccountActivityWebhookEnvironmentsParameters extends CustomRequestParameters implements IGetAccountActivityWebhookEnvironmentsParameters {
}

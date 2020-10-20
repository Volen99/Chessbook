import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";

// For more information visit: https://developer.twitter.com/en/docs/accounts-and-users/subscribe-account-activity/api-reference/aaa-premium#get-account-activity-all-subscriptions-count
export interface ICountAccountActivitySubscriptionsParameters extends ICustomRequestParameters {
}

export class CountAccountActivitySubscriptionsParameters extends CustomRequestParameters implements ICountAccountActivitySubscriptionsParameters {
}

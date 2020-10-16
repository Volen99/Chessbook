import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";

// For more information visit: https://developer.twitter.com/en/docs/accounts-and-users/subscribe-account-activity/api-reference/aaa-premium#get-account-activity-all-env-name-subscriptions-list
export interface IGetAccountActivitySubscriptionsParameters extends ICustomRequestParameters {
  // The environment for which we want to test the subscription
  environment: string;
}

export class GetAccountActivitySubscriptionsParameters extends CustomRequestParameters implements IGetAccountActivitySubscriptionsParameters {
  constructor(environment: string) {
    super();
    this.environment = environment;
  }

  public environment: string;
}

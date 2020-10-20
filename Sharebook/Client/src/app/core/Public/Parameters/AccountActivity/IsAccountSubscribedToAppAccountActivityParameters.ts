import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";

// For more information visit: https://developer.twitter.com/en/docs/accounts-and-users/subscribe-account-activity/api-reference/aaa-premium#get-account-activity-all-env-name-subscriptions
export interface IIsAccountSubscribedToAccountActivityParameters extends ICustomRequestParameters {
  // The environment for which we want to test the subscription
  environment: string;
}

export class IsAccountSubscribedToAccountActivityParameters extends CustomRequestParameters implements IIsAccountSubscribedToAccountActivityParameters {
  public constructor(environment: string) {
    super();
    this.environment = environment;
  }

  public environment: string;
}

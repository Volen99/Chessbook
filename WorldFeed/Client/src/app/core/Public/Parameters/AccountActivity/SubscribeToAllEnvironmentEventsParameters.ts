import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";

// For more information visit: https://developer.twitter.com/en/docs/accounts-and-users/subscribe-account-activity/api-reference/aaa-premium#post-account-activity-all-env-name-subscriptions
export interface ISubscribeToAccountActivityParameters extends ICustomRequestParameters {
  // The environment in which the webhook is registered
  environment: string;
}

export class SubscribeToAccountActivityParameters extends CustomRequestParameters implements ISubscribeToAccountActivityParameters {
  constructor(environment: string) {
    super();
    this.environment = environment;
  }

  public environment: string;
}

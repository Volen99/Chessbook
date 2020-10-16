import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";

// For more information visit: https://developer.twitter.com/en/docs/accounts-and-users/subscribe-account-activity/api-reference/aaa-premium#delete-account-activity-all-env-name-subscriptions-user-id-json
export interface IUnsubscribeFromAccountActivityParameters extends ICustomRequestParameters {
  // The environment in which the webhook is registered
  environment: string;

  // The user id that we want to unsubscribe
  userId: number;
}

export class UnsubscribeFromAccountActivityParameters extends CustomRequestParameters implements IUnsubscribeFromAccountActivityParameters {
  constructor(environment: string, userId: number) {
    super();
    this.environment = environment;
    this.userId = userId;
  }

  public environment: string;
  public userId: number;
}

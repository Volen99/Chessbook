import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";

// For more information visit : https://developer.twitter.com/en/docs/accounts-and-users/subscribe-account-activity/api-reference/aaa-premium#get-account-activity-all-webhooks
export interface IGetAccountActivityEnvironmentWebhooksParameters extends ICustomRequestParameters {
  // The environment for which we want to get the list of webhooks
  environment: string;
}

export class GetAccountActivityEnvironmentWebhooksParameters extends CustomRequestParameters implements IGetAccountActivityEnvironmentWebhooksParameters {
  constructor(environment: string) {
    super();
    this.environment = environment;
  }

  public environment: string;
}

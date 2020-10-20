import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";

// For more information visit: https://developer.twitter.com/en/docs/accounts-and-users/subscribe-account-activity/api-reference/aaa-premium#post-account-activity-all-env-name-webhooks
export interface ICreateAccountActivityWebhookParameters extends ICustomRequestParameters {
  // The environment used to register the webhook
  environment: string;

  // URL for the callback endpoint.
  webhookUrl: string;
}

export class CreateAccountActivityWebhookParameters extends CustomRequestParameters implements ICreateAccountActivityWebhookParameters {
  constructor(environment: string, callbackUrl: string) {
    super();
    this.environment = environment;
    this.webhookUrl = callbackUrl;
  }

  public environment: string;
  public webhookUrl: string;
}

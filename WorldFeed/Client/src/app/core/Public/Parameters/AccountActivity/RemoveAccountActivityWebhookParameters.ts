import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";

// For more information visit: https://developer.twitter.com/en/docs/accounts-and-users/subscribe-account-activity/api-reference/aaa-premium#delete-account-activity-all-env-name-webhooks-webhook-id
export interface IDeleteAccountActivityWebhookParameters extends ICustomRequestParameters {
  // The environment in which the webhook is registered
  environment: string;

  /// The webhook identifier
  webhookId: string;
}

export class DeleteAccountActivityWebhookParameters extends CustomRequestParameters implements IDeleteAccountActivityWebhookParameters {
  constructor(environment: string, webhookId: string) {
    super();
    this.environment = environment;
    this.webhookId = webhookId;
  }

  public environment: string;
  public webhookId: string;
}

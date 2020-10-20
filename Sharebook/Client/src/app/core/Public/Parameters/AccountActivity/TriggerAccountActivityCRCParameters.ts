import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";

// For more information visit: https://developer.twitter.com/en/docs/accounts-and-users/subscribe-account-activity/api-reference/aaa-premium#put-account-activity-all-env-name-webhooks-webhook-id
export interface ITriggerAccountActivityWebhookCRCParameters extends ICustomRequestParameters {
  // The environment in which the webhook is registered
  environment: string;

  // The webhook identifier
  webhookId: string;
}

export class TriggerAccountActivityWebhookCRCParameters extends CustomRequestParameters implements ITriggerAccountActivityWebhookCRCParameters {
  constructor(environment: string, webhookId: string) {
    super();
    this.environment = environment;
    this.webhookId = webhookId;
  }

  public environment: string;
  public webhookId: string;
}

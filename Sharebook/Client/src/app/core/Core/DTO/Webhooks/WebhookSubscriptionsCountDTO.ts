import {IWebhookSubscriptionsCount} from "../../../Public/Models/Interfaces/IWebhookSubscriptionsCount";

export class WebhookSubscriptionsCountDTO implements IWebhookSubscriptionsCount {
  // [JsonProperty("account_name")]
  public accountName: string;
  // [JsonProperty("subscriptions_count")]
  public subscriptionsCount: string;
  // [JsonProperty("provisioned_count")]
  public provisionedCount: string;
}



import {IWebhookEnvironmentSubscriptionsDTO, IWebhookSubscriptionDTO } from "../../../Public/Models/Interfaces/DTO/Webhooks/IWebhookEnvironmentSubscriptionsDTO";

export class WebhookSubscriptionDTO implements IWebhookSubscriptionDTO {
  // [JsonProperty("user_id")]
  public userId: string;
}

export class WebhookEnvironmentSubscriptionsDTO implements IWebhookEnvironmentSubscriptionsDTO {
  public environment: string;

  // [JsonProperty("application_id")]
  public applicationId: string;

  public subscriptions: IWebhookSubscriptionDTO[];
}

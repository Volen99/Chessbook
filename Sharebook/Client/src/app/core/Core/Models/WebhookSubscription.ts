import {IWebhookSubscription} from "../../Public/Models/Interfaces/IWebhookSubscription";
import {IWebhookSubscriptionDTO} from "../../Public/Models/Interfaces/DTO/Webhooks/IWebhookEnvironmentSubscriptionsDTO";

export class WebhookSubscription implements IWebhookSubscription {
  private readonly _subscriptionDTO: IWebhookSubscriptionDTO;

  constructor(subscriptionDTO: IWebhookSubscriptionDTO) {
    this._subscriptionDTO = subscriptionDTO;
  }

  get userId(): string {
    return this._subscriptionDTO.userId;
  }
}

import {IWebhookEnvironmentSubscriptions} from "../../Public/Models/Interfaces/IWebhookEnvironmentSubscriptions";
import {IWebhookEnvironmentSubscriptionsDTO} from "../../Public/Models/Interfaces/DTO/Webhooks/IWebhookEnvironmentSubscriptionsDTO";
import {ITwitterClient} from "../../Public/ITwitterClient";
import {IWebhookSubscription} from "../../Public/Models/Interfaces/IWebhookSubscription";
import {WebhookSubscription} from "./WebhookSubscription";

export class WebhookEnvironmentSubscriptions implements IWebhookEnvironmentSubscriptions {
  constructor(webhookEnvironmentSubscriptionsDTO: IWebhookEnvironmentSubscriptionsDTO, client: ITwitterClient) {
    this.webhookEnvironmentSubscriptionsDTO = webhookEnvironmentSubscriptionsDTO;
    this.client = client;
  }

  public client: ITwitterClient;

  public webhookEnvironmentSubscriptionsDTO: IWebhookEnvironmentSubscriptionsDTO;

  get environmentName(): string {
    return this.webhookEnvironmentSubscriptionsDTO.environment;
  }

  get applicationId(): string {
    return this.webhookEnvironmentSubscriptionsDTO.applicationId;
  }

  get subscriptions(): IWebhookSubscription[] {
    return this.webhookEnvironmentSubscriptionsDTO.subscriptions.map(x => new WebhookSubscription(x) as IWebhookSubscription);
  }
}

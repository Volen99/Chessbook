import {ITwitterClient} from "../../ITwitterClient";
import {IWebhookEnvironmentSubscriptionsDTO} from "./DTO/Webhooks/IWebhookEnvironmentSubscriptionsDTO";
import {IWebhookSubscription} from "./IWebhookSubscription";

export interface IWebhookEnvironmentSubscriptions {
  client: ITwitterClient;
  webhookEnvironmentSubscriptionsDTO: IWebhookEnvironmentSubscriptionsDTO;

  // Name of the webhook environment
  environmentName: string;

  // Application id associated with the environment
  applicationId: string;

  // List of users who subscribed to that environment
  subscriptions: IWebhookSubscription[];
}

export interface IWebhookSubscriptionDTO {
  userId: string;
}

export interface IWebhookEnvironmentSubscriptionsDTO {
  environment: string;
  applicationId: string;
  subscriptions: IWebhookSubscriptionDTO[];
}


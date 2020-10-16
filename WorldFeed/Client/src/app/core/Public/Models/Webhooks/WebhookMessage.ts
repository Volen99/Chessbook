export interface IWebhookMessage {
  json: string;
}

export class WebhookMessage implements IWebhookMessage {
  constructor(json: string) {
    this.json = json;
  }

  public json: string;
}

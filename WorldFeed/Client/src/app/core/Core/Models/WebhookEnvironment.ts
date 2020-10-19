import {IWebhook} from '../../Public/Models/Interfaces/IWebhook';
import {IWebhookEnvironment} from "../../Public/Models/Interfaces/IWebhookEnvironment";
import {ITwitterClient} from "../../Public/ITwitterClient";
import {IWebhookEnvironmentDTO} from "../../Public/Models/Interfaces/DTO/Webhooks/IWebhookEnvironmentDTO";

export class WebhookEnvironment implements IWebhookEnvironment {
  private readonly _client: ITwitterClient;

  constructor(webhookEnvironmentDTO: IWebhookEnvironmentDTO, client: ITwitterClient) {
    this._client = client;
    this.webhookEnvironmentDTO = webhookEnvironmentDTO;
  }

  // [JsonIgnore]
  public webhookEnvironmentDTO: IWebhookEnvironmentDTO;

  get name(): string {
    return this.webhookEnvironmentDTO.name;
  }

  get webhooks(): IWebhook[] {
    return this.webhookEnvironmentDTO.webhooks.map(x => this._client.factories.createWebhook(x));
  }
}

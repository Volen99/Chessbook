import {IWebhookDTO} from "../../../Public/Models/Interfaces/DTO/Webhooks/IWebhookDTO";
import {IWebhookEnvironmentDTO} from "../../../Public/Models/Interfaces/DTO/Webhooks/IWebhookEnvironmentDTO";

export class WebhookEnvironmentDTO implements IWebhookEnvironmentDTO {
  // [JsonProperty("environment_name")]
  public name: string;

  public webhooks: IWebhookDTO[];
}

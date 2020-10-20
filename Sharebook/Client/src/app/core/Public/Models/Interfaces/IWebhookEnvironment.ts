import {IWebhook} from "./IWebhook";
import {IWebhookEnvironmentDTO} from "./DTO/Webhooks/IWebhookEnvironmentDTO";

export interface IWebhookEnvironment {
  // [JsonIgnore]
  webhookEnvironmentDTO: IWebhookEnvironmentDTO;

  // Name of the environment
  name: string;

  // Webhooks registered in the environment
  webhooks: IWebhook[];
}

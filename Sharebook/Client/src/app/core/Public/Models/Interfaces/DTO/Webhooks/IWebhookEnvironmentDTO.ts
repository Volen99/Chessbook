import {IWebhookDTO} from "./IWebhookDTO";

export interface IWebhookEnvironmentDTO {
  name: string;
  webhooks: IWebhookDTO[];
}

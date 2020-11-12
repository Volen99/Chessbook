import { IWebhook } from '../../Public/Models/Interfaces/IWebhook';
import {IWebhookDTO} from "../../Public/Models/Interfaces/DTO/Webhooks/IWebhookDTO";
import DateTime from "typescript-dotnet-commonjs/System/Time/DateTime";
import Uri from "typescript-dotnet-commonjs/System/Uri/Uri";

export class Webhook implements IWebhook {
  constructor(dto: IWebhookDTO) {
    this.webhookDTO = dto;
  }

  // [JsonIgnore]
  public webhookDTO: IWebhookDTO;

  get id(): string {
    return this.webhookDTO.id;
  }

  get url(): string {
    return this.webhookDTO.url;
  }

  get valid(): boolean {
    return this.webhookDTO.valid;
  }

  get createdAt(): DateTime { // DateTimeOffset
    return this.webhookDTO.createdAt;
  }

  get uri(): Uri {
    return this.webhookDTO.uri;
  }
}

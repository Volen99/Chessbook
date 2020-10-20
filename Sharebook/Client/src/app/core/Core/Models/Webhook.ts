import Uri from 'src/app/c#-objects/TypeScript.NET-Core/packages/Web/source/Uri/Uri';
import { IWebhook } from '../../Public/Models/Interfaces/IWebhook';
import {IWebhookDTO} from "../../Public/Models/Interfaces/DTO/Webhooks/IWebhookDTO";
import DateTime from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Time/DateTime";

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

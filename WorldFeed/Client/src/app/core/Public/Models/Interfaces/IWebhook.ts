import Uri from 'src/app/c#-objects/TypeScript.NET-Core/packages/Web/source/Uri/Uri';
import {IWebhookDTO} from "./DTO/Webhooks/IWebhookDTO";
import DateTime from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Time/DateTime";

export interface IWebhook {
  webhookDTO: IWebhookDTO;

  // Webhook identifier
  id: string;

  // Registered url
  url: string;

  // Whether the webhook succeeded its last crc challenge
  valid: boolean;

  // Registration date
  createdAt: DateTime; // DateTimeOffset;

  // Registered Uri
  uri: Uri;
}

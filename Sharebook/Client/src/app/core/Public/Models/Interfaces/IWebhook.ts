import {IWebhookDTO} from "./DTO/Webhooks/IWebhookDTO";
import DateTime from "typescript-dotnet-commonjs/System/Time/DateTime";
import Uri from "typescript-dotnet-commonjs/System/Uri/Uri";

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

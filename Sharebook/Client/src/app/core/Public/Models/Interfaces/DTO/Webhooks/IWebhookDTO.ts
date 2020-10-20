import Uri from 'src/app/c#-objects/TypeScript.NET-Core/packages/Web/source/Uri/Uri';
import DateTime from "../../../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Time/DateTime";

export interface IWebhookDTO {
  id: string;
  url: string;
  valid: boolean;
  createdAt: DateTime; // DateTimeOffset;
  uri: Uri;
}

import Uri from "typescript-dotnet-commonjs/System/Uri/Uri";
import DateTime from "typescript-dotnet-commonjs/System/Time/DateTime";

export interface IWebhookDTO {
  id: string;
  url: string;
  valid: boolean;
  createdAt: DateTime; // DateTimeOffset;
  uri: Uri;
}

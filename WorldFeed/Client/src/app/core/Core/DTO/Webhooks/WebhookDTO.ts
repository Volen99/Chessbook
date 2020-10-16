import Uri from "../../../../c#-objects/TypeScript.NET-Core/packages/Web/source/Uri/Uri";
import {IWebhookDTO} from "../../../Public/Models/Interfaces/DTO/Webhooks/IWebhookDTO";
import DateTime from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Time/DateTime";

export class WebhookDTO implements IWebhookDTO {
  private _uri: Uri;

  public id: string;
  public url: string;

  // [JsonIgnore]
  get uri(): Uri {
    if (this._uri == null) {
      this._uri = Uri.from(this.url);
    }

    return this._uri;
  }


  public valid: boolean;

  // [JsonProperty("created_timestamp")]
  // [JsonConverter(typeof(JsonTwitterDateTimeOffsetConverter), "yyyy-MM-dd HH:mm:ss zzzz")]
  public createdAt: DateTime;  // DateTimeOffset;
}

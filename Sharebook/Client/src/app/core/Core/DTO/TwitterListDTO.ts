import {PrivacyMode} from '../../Public/Models/Enum/PrivacyMode';
import {ITwitterListDTO} from "../../Public/Models/Interfaces/DTO/ITwitterListDTO";
import {IUserDTO} from "../../Public/Models/Interfaces/DTO/IUserDTO";
import DateTime from "typescript-dotnet-commonjs/System/Time/DateTime";

export class TwitterListDTO implements ITwitterListDTO {
  // [JsonProperty("id")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public id: number;

  // [JsonProperty("id_str")]
  public idStr: string;

  // [JsonProperty("slug")]
  public slug: string;

  // [JsonIgnore]
  get ownerId(): number {
    return this.owner?.id ?? 0;
  }

  // [JsonIgnore]
  get ownerScreenName(): string {
    return this.owner?.screenName;
  }

  // [JsonProperty("name")]
  public name: string;

  // [JsonProperty("full_name")]
  public fullName: string;

  // [JsonProperty("user")]
  public owner: IUserDTO;

  // [JsonProperty("created_at")]
  // [JsonConverter(typeof(JsonTwitterDateTimeOffsetConverter))]
  public createdAt: DateTime; // DateTimeOffset`

  // [JsonProperty("uri")]
  public uri: string;

  // [JsonProperty("description")]
  public description: string;

  // [JsonProperty("following")]
  public following: boolean;

  // [JsonProperty("mode")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public privacyMode: PrivacyMode;

  // [JsonProperty("member_count")]
  public memberCount: number;

  // [JsonProperty("subscriber_count")]
  public subscriberCount: number;
}

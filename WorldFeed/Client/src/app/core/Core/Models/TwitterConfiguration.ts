import {ITwitterConfiguration} from "../../Public/Models/Interfaces/DTO/ITwitterConfiguration";
import Dictionary from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Dictionaries/Dictionary";
import {IMediaEntitySize} from "../../Public/Models/Entities/IMediaEntitySize";

export class TwitterConfiguration implements ITwitterConfiguration {
  // [JsonProperty("characters_reserved_per_media")]
  public charactersReservedPerMedia: number;

  // [JsonProperty("dm_text_character_limit")]
  public messageTextCharacterLimit: number;

  // [JsonProperty("max_media_per_upload")]
  public maxMediaPerUpload: number;

  // [JsonProperty("non_username_paths")]
  public nonUsernamePaths: string[];

  // [JsonProperty("photo_size_limit")]
  public photoSizeLimit: number;

  // [JsonProperty("photo_sizes")]
  public photoSizes: Dictionary<string, IMediaEntitySize>;

  // [JsonProperty("short_url_length")]
  public shortURLLength: number;

  // [JsonProperty("short_url_length_https")]
  public shortURLLengthHttps: number;
}

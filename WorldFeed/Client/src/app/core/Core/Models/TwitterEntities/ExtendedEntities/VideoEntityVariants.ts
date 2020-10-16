import {IVideoEntityVariant} from "../../../../Public/Models/Entities/ExtendedEntities/IVideoEntityVariant";

export class VideoEntityVariant implements IVideoEntityVariant {
  // [JsonProperty("bitrate")]
  public bitrate: number;
  // [JsonProperty("content_type")]
  public contentType: string;
  // [JsonProperty("url")]
  public URL: string;
}

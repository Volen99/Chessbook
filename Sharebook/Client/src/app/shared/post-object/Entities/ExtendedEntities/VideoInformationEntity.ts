import {IVideoInformationEntity} from "../interfaces/ExtendedEntities/IVideoInformationEntity";
import {IVideoEntityVariant} from "../interfaces/ExtendedEntities/IVideoEntityVariant";

export class VideoInformationEntity implements IVideoInformationEntity {
  // [JsonProperty("aspect_ratio")]
  public aspectRatio: number[];

  // [JsonProperty("duration_millis")]
  public durationInMilliseconds: number;

  // [JsonProperty("variants")]
  public variants: IVideoEntityVariant[];
}

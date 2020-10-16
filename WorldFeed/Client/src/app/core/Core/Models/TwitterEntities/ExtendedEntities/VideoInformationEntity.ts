import {IVideoInformationEntity} from "../../../../Public/Models/Entities/ExtendedEntities/IVideoInformationEntity";
import {IVideoEntityVariant} from "../../../../Public/Models/Entities/ExtendedEntities/IVideoEntityVariant";

export class VideoInformationEntity implements IVideoInformationEntity {
  // [JsonProperty("aspect_ratio")]
  public aspectRatio: number[];

  // [JsonProperty("duration_millis")]
  public durationInMilliseconds: number;

  // [JsonProperty("variants")]
  public variants: IVideoEntityVariant[];
}

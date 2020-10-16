import {IMediaEntity} from "../../Public/Models/Entities/IMediaEntity";
import {IAttachmentDTO} from "../../Public/Models/Interfaces/DTO/IAttachmentDTO";
import {AttachmentType} from "../../Public/Models/Enum/AttachmentType";

export class AttachmentDTO implements IAttachmentDTO {
  // [JsonProperty("type")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public type: AttachmentType;

  // [JsonProperty("media")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public media: IMediaEntity;
}


import {IMediaEntity} from "../../Entities/IMediaEntity";
import {AttachmentType} from "../../Enum/AttachmentType";

export interface IAttachmentDTO {
  type: AttachmentType;
  media: IMediaEntity;
}

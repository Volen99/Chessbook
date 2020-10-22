import {IMediaEntity} from "../../Entities/IMediaEntity";
import {AttachmentType} from "../../Enum/AttachmentType";
import {ITweetIdentifier} from "../ITweetIdentifier";
import {InjectionToken} from "@angular/core";
import {AttachmentDTO} from "../../../../Core/DTO/AttachmentDTO";

export interface IAttachmentDTO {
  type: AttachmentType;
  media: IMediaEntity;
}

export const IAttachmentDTOToken = new InjectionToken<IAttachmentDTO>('IAttachmentDTO', {
  providedIn: 'root',
  factory: () => new AttachmentDTO(),
});

import {IQuickReplyResponse} from "../IQuickReplyResponse";
import {IAttachmentDTO} from "./IAttachmentDTO";
import {IMessageEntities} from "../../Entities/IMessageEntities";
import {IQuickReplyDTO} from "./IQuickReplyDTO";
import {InjectionToken} from "@angular/core";
import {MessageDataDTO} from "../../../../Core/DTO/MessageDataDTO";

export interface IMessageDataDTO {
  text: string;
  entities: IMessageEntities;
  quickReply: IQuickReplyDTO;
  quickReplyResponse: IQuickReplyResponse;
  attachment: IAttachmentDTO;
}

export const IMessageDataDTOToken = new InjectionToken<IMessageDataDTO>('IMessageDataDTO', {
  providedIn: 'root',
  factory: () => new MessageDataDTO(),
});

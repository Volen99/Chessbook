import {IQuickReplyResponse} from "../IQuickReplyResponse";
import {IAttachmentDTO} from "./IAttachmentDTO";
import {IMessageEntities} from "../../Entities/IMessageEntities";
import {IQuickReplyDTO} from "./IQuickReplyDTO";

export interface IMessageDataDTO {
  text: string;
  entities: IMessageEntities;
  quickReply: IQuickReplyDTO;
  quickReplyResponse: IQuickReplyResponse;
  attachment: IAttachmentDTO;
}

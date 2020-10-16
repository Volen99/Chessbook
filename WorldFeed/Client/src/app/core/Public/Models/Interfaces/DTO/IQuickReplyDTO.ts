import {IQuickReplyOption} from "../IQuickReplyOption";
import {QuickReplyType} from "../../Enum/QuickReplyType";

export interface IQuickReplyDTO {
  type: QuickReplyType;
  options: IQuickReplyOption[];
}

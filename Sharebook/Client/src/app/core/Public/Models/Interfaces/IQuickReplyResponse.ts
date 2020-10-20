import {QuickReplyType} from "../Enum/QuickReplyType";

export interface IQuickReplyResponse {
  type: QuickReplyType;
  metadata: string;
}

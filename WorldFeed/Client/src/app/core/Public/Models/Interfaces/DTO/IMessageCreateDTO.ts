import {IMessageDataDTO} from "./IMessageDataDTO";
import {IMessageCreateTargetDTO} from "./IMessageCreateTargetDTO";

export interface IMessageCreateDTO {
  // Twitter fields
  target: IMessageCreateTargetDTO;
  senderId: number;
  sourceAppId?: number;
  messageData: IMessageDataDTO;
}

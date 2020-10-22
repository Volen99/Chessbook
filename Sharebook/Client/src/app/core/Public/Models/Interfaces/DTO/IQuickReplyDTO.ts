import {IQuickReplyOption} from "../IQuickReplyOption";
import {QuickReplyType} from "../../Enum/QuickReplyType";
import {InjectionToken} from "@angular/core";
import {QuickReplyDTO} from "../../../../Core/DTO/QuickReplyDTO";

export interface IQuickReplyDTO {
  type: QuickReplyType;
  options: IQuickReplyOption[];
}

export const IQuickReplyDTOToken = new InjectionToken<IQuickReplyDTO>('IQuickReplyDTO', {
  providedIn: 'root',
  factory: () => new QuickReplyDTO(),
});

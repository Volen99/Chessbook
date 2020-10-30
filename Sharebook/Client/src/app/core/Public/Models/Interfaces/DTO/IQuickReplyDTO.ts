import {InjectionToken} from "@angular/core";

import {IQuickReplyOption} from "../IQuickReplyOption";
import {QuickReplyType} from "../../Enum/QuickReplyType";
import {QuickReplyDTO} from "../../../../Core/DTO/QuickReplyDTO";

export interface IQuickReplyDTO {
  type: QuickReplyType;
  options: IQuickReplyOption[];
}

export const IQuickReplyDTOToken = new InjectionToken<IQuickReplyDTO>('IQuickReplyDTO', {
  providedIn: 'root',
  factory: () => new QuickReplyDTO(),
});

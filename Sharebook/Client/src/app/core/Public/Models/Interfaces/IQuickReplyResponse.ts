import {InjectionToken} from "@angular/core";

import {QuickReplyType} from "../Enum/QuickReplyType";
import {QuickReplyResponse} from "../../../Core/Models/Properties/QuickReplyResponse";

export interface IQuickReplyResponse {
  type: QuickReplyType;
  metadata: string;
}

export const IQuickReplyResponseToken = new InjectionToken<IQuickReplyResponse>('IQuickReplyResponse', {
  providedIn: 'root',
  factory: () => new QuickReplyResponse(),
});

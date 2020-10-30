import {InjectionToken} from "@angular/core";

import {MessageCreateTargetDTO} from "../../../../Core/DTO/MessageCreateTargetDTO";

export interface IMessageCreateTargetDTO {
  recipientId: number;
}

export const IMessageCreateTargetDTOToken = new InjectionToken<IMessageCreateTargetDTO>('IMessageCreateTargetDTO', {
  providedIn: 'root',
  factory: () => new MessageCreateTargetDTO(),
});

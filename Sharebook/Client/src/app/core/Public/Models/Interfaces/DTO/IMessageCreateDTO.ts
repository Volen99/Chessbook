﻿import {InjectionToken} from "@angular/core";

import {IMessageDataDTO} from "./IMessageDataDTO";
import {IMessageCreateTargetDTO} from "./IMessageCreateTargetDTO";
import {MessageCreateDTO} from "../../../../Core/DTO/MessageCreateDTO";

export interface IMessageCreateDTO {
  // Twitter fields
  target: IMessageCreateTargetDTO;
  senderId: number;
  sourceAppId?: number;
  messageData: IMessageDataDTO;
}

export const IMessageCreateDTOToken = new InjectionToken<IMessageCreateDTO>('IMessageCreateDTO', {
  providedIn: 'root',
  factory: () => new MessageCreateDTO(),
});

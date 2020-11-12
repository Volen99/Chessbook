import {InjectionToken} from "@angular/core";

import {EventType} from "../../../Enum/EventType";
import {IEventInitiatedViaDTO} from "../IEventInitiatedViaDTO";
import {IMessageCreateDTO} from "../IMessageCreateDTO";
import {MessageEventDTO} from "../../../../../Core/DTO/Events/MessageEventDTO";
import DateTime from "typescript-dotnet-commonjs/System/Time/DateTime";

export interface IMessageEventDTO {
  type: EventType;
  id: number;
  createdAt: DateTime; // DateTimeOffset;
  initiatedVia: IEventInitiatedViaDTO;
  messageCreate: IMessageCreateDTO;
}

export const IMessageEventDTOToken = new InjectionToken<IMessageEventDTO>('IMessageEventDTO', {
  providedIn: 'root',
  factory: () => new MessageEventDTO(),
});

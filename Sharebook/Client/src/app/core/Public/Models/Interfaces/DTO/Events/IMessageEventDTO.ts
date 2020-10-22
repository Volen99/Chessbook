import {EventType} from "../../../Enum/EventType";
import {IEventInitiatedViaDTO} from "../IEventInitiatedViaDTO";
import {IMessageCreateDTO} from "../IMessageCreateDTO";
import DateTime from "../../../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Time/DateTime";
import {InjectionToken} from "@angular/core";
import {MessageEventDTO} from "../../../../../Core/DTO/Events/MessageEventDTO";

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

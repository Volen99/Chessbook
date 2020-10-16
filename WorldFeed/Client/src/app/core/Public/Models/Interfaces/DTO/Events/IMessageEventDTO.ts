import {EventType} from "../../../Enum/EventType";
import {IEventInitiatedViaDTO} from "../IEventInitiatedViaDTO";
import {IMessageCreateDTO} from "../IMessageCreateDTO";
import DateTime from "../../../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Time/DateTime";

export interface IMessageEventDTO {
  type: EventType;
  id: number;
  createdAt: DateTime; // DateTimeOffset;
  initiatedVia: IEventInitiatedViaDTO;
  messageCreate: IMessageCreateDTO;
}

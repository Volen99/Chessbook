import {IMessageEventDTO} from "./Events/IMessageEventDTO";
import {IApp} from "../IApp";
import Dictionary from "../../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Dictionaries/Dictionary";

export interface IGetMessageDTO {
  messageEvent: IMessageEventDTO;
  apps: Dictionary<number, IApp>;
}

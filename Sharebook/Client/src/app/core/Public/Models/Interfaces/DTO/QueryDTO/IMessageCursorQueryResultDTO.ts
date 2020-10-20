import {IBaseCursorQueryDTO} from "./IBaseCursorQueryDTO";
import {IMessageEventDTO} from "../Events/IMessageEventDTO";
import Dictionary from "../../../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Dictionaries/Dictionary";
import {IApp} from "../../IApp";

export interface IMessageCursorQueryResultDTO extends IBaseCursorQueryDTO<IMessageEventDTO> {
  messageEvents: IMessageEventDTO[];
  apps: Dictionary<number, IApp>;
}

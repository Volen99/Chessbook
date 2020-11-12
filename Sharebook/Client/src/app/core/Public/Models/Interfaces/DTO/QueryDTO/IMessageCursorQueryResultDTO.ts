import {IBaseCursorQueryDTO} from "./IBaseCursorQueryDTO";
import {IMessageEventDTO} from "../Events/IMessageEventDTO";
import {IApp} from "../../IApp";
import Dictionary from "typescript-dotnet-commonjs/System/Collections/Dictionaries/Dictionary";

export interface IMessageCursorQueryResultDTO extends IBaseCursorQueryDTO<IMessageEventDTO> {
  messageEvents: IMessageEventDTO[];
  apps: Dictionary<number, IApp>;
}

import {BaseCursorQueryDTO} from "./BaseCursorQueryDTO";
import {IApp} from "../../../Public/Models/Interfaces/IApp";
import {IMessageEventDTO} from "../../../Public/Models/Interfaces/DTO/Events/IMessageEventDTO";
import {IMessageCursorQueryResultDTO} from "../../../Public/Models/Interfaces/DTO/QueryDTO/IMessageCursorQueryResultDTO";
import {MessageEventDTO} from "../Events/MessageEventDTO";
import Dictionary from "typescript-dotnet-commonjs/System/Collections/Dictionaries/Dictionary";

export class MessageCursorQueryResultDTO extends BaseCursorQueryDTO<IMessageEventDTO> implements IMessageCursorQueryResultDTO {
  private _messageEvents: IMessageEventDTO[];

  // This property does not exists
  // [JsonIgnore]
  public nextCursor: number;   // override

  // [JsonProperty("next_cursor")]
  public nextCursorStr: string;

  // [JsonProperty("apps")]
  public apps: Dictionary<number, IApp>;

  public getNumberOfObjectRetrieved(): number {
    return this.messageEvents.length;
  }

  // [JsonProperty("events")]
  get messageEvents(): IMessageEventDTO[] {
    return this._messageEvents ?? new MessageEventDTO()[0];  // new IMessageEventDTO[0];
  }

  set messageEvents(value: IMessageEventDTO[]) {
    this._messageEvents = value;
    super.results = value;
  }
}

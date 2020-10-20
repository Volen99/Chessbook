import {IBaseCursorQueryDTO} from "../../../Public/Models/Interfaces/DTO/QueryDTO/IBaseCursorQueryDTO";

export abstract class BaseCursorQueryDTO<T> implements IBaseCursorQueryDTO<T> {
  // Properties had virtuals
  // [JsonProperty("previous_cursor")]
  public previousCursor: number;

  // [JsonProperty("next_cursor")]
  public nextCursor: number;

  // [JsonProperty("previous_cursor_str")]
  public previousCursorStr: string;

  // [JsonProperty("next_cursor_str")]
  public nextCursorStr: string;

  // [JsonIgnore]
  public rawResult: string;

  // [JsonIgnore]
  public results: Array<T>;

  public abstract getNumberOfObjectRetrieved(): number;
}

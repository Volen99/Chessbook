import {BaseCursorQueryDTO} from "./BaseCursorQueryDTO";
import {IIdsCursorQueryResultDTO} from "../../../Public/Models/Interfaces/DTO/QueryDTO/IIdsCursorQueryResultDTO";

export class IdsCursorQueryResultDTO extends BaseCursorQueryDTO<number> implements IIdsCursorQueryResultDTO {
  private _ids: number[];

  // [JsonProperty("ids")]
  get ids(): number[] {
    return this._ids ?? new Array<number>(0);
  }

  set ids(value: Array<number>) {
    this._ids = value;
    super.results = value;
  }


  public getNumberOfObjectRetrieved(): number { // override
    return this.ids.length;
  }
}

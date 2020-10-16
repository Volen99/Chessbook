import {BaseCursorQueryDTO} from "./BaseCursorQueryDTO";
import {ITwitterListDTO} from "../../../Public/Models/Interfaces/DTO/ITwitterListDTO";
import {ITwitterListCursorQueryResultDTO} from "../../../Public/Models/Interfaces/DTO/QueryDTO/ITwitterListCursorQueryResultDTO";
import {TwitterListDTO} from "../TwitterListDTO";

export class TwitterListCursorQueryResultDTO extends BaseCursorQueryDTO<ITwitterListDTO> implements ITwitterListCursorQueryResultDTO {
  private _twitterLists: ITwitterListDTO[];

  // [JsonProperty("lists")]
  get twitterLists(): ITwitterListDTO[] {
    return this._twitterLists ?? new TwitterListDTO()[0];  // new ITwitterListDTO[0];
  }

  set twitterLists(value: ITwitterListDTO[]) {
    this._twitterLists = value;
    super.results = value;
  }

  public getNumberOfObjectRetrieved(): number {
    return this.twitterLists.length;
  }
}

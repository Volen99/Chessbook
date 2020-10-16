import {IBaseCursorQueryDTO} from "./IBaseCursorQueryDTO";
import {ITwitterListDTO} from "../ITwitterListDTO";

export interface ITwitterListCursorQueryResultDTO extends IBaseCursorQueryDTO<ITwitterListDTO> {
  twitterLists: ITwitterListDTO[];
}

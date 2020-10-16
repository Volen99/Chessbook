import {IBaseCursorQueryDTO} from "./IBaseCursorQueryDTO";

export interface IIdsCursorQueryResultDTO extends IBaseCursorQueryDTO<number> {
  ids: number[];
}

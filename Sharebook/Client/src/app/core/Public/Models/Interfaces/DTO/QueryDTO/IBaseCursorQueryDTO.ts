import {InjectionToken} from "@angular/core";
import {IMessageEventDTO} from "../Events/IMessageEventDTO";

export interface IBaseCursorQueryDTO<T = any> {
  previousCursor: number;
  nextCursor: number;

  previousCursorStr: string;
  nextCursorStr: string;

  rawResult: string;

  results?: Array<T>;

  getNumberOfObjectRetrieved(): number;
}

// export interface IBaseCursorQueryDTO<T> extends IBaseCursorQueryDTO {
//   Results: IEnumerable<T>;
// }

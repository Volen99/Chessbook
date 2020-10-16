import {IBaseCursorQueryDTO} from "./IBaseCursorQueryDTO";
import {IUserDTO} from "../IUserDTO";

export interface IUserCursorQueryResultDTO extends IBaseCursorQueryDTO<IUserDTO> {
  users: IUserDTO[];
}

import {BaseCursorQueryDTO} from "./BaseCursorQueryDTO";
import {IUserDTO} from "../../../Public/Models/Interfaces/DTO/IUserDTO";
import {IUserCursorQueryResultDTO} from "../../../Public/Models/Interfaces/DTO/QueryDTO/IUserCursorQueryResultDTO";
import {UserDTO} from "../UserDTO";

export class UserCursorQueryResultDTO extends BaseCursorQueryDTO<IUserDTO> implements IUserCursorQueryResultDTO {
  private _users: IUserDTO[];

  // [JsonProperty("users")]
  get users(): IUserDTO[] {
    return this._users ?? new UserDTO()[0];   // new IUserDTO[0];
  }

  set users(value: IUserDTO[]) {
    this._users = value;
    super.results = value;
  }

  public getNumberOfObjectRetrieved(): number {
    return this.users.length;
  }
}

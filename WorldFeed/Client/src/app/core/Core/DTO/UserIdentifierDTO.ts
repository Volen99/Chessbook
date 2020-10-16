import {IUserIdentifier} from "../../Public/Models/Interfaces/IUserIdentifier";

export class UserIdentifierDTO implements IUserIdentifier {
  private _id: number;

  // [JsonProperty("id")]
  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
    this.idStr = this._id.toString();
  }

  // [JsonProperty("id_str")]
  public idStr: string;

  // [JsonProperty("screen_name")]
  public screenName: string;
}

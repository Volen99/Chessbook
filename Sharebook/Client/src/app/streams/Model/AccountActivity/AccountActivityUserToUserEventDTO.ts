import {IUserDTO} from "../../../core/Public/Models/Interfaces/DTO/IUserDTO";

export class AccountActivityUserToUserEventDTO {
  public Type: string;

  // [JsonProperty("created_timestamp")]
  public CreatedTimestamp: string;

  // [JsonProperty("source")]
  public Source: IUserDTO;

  // [JsonProperty("target")]
  public Target: IUserDTO;
}

import {IUserDTO} from "../../../core/Public/Models/Interfaces/DTO/IUserDTO";
import {ITweetDTO} from "../../../core/Public/Models/Interfaces/DTO/ITweetDTO";

export class AccountActivityFavoriteEventDTO {
  public Id: string;

  // [JsonProperty("user")]
  public User: IUserDTO;

  // [JsonProperty("favorited_status")]
  public FavoritedTweet: ITweetDTO;
}

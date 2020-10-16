import Dictionary from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Dictionaries/Dictionary";
import {App} from "../../../core/Core/Models/Properties/App";
import {UserDTO} from "../../../core/Core/DTO/UserDTO";

export class BaseAccountActivityMessageEventDTO {
  // [JsonProperty("apps")]
  public Apps: Dictionary<string, App>;

  // [JsonProperty("users")]
  public UsersById: Dictionary<string, UserDTO>;
}

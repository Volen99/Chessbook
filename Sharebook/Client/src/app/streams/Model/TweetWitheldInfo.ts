import IEnumerable from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Enumeration/IEnumerable";

export class TweetWitheldInfo implements ITweetWitheldInfo {
  // [JsonProperty("id")]
  public Id: number;

  // [JsonProperty("user_id")]
  public UserId: number;

  // [JsonProperty("withheld_in_countries")]
  public WitheldInCountries: IEnumerable<string>;
}

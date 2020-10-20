import IEnumerable from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Enumeration/IEnumerable";

export class UserWitheldInfo implements IUserWitheldInfo {
  // [JsonProperty("id")]
  public Id: number;

  // [JsonProperty("withheld_in_countries")]
  public WitheldInCountries: IEnumerable<string>;
}

import IEnumerable from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Enumeration/IEnumerable";

export interface IUserWitheldInfo {
  Id: number;
  WitheldInCountries: IEnumerable<string>;
}

import IEnumerable from "typescript-dotnet-commonjs/System/Collections/Enumeration/IEnumerable";

export interface IUserWitheldInfo {
  Id: number;
  WitheldInCountries: IEnumerable<string>;
}

import {IUserIdentifier} from "../../Public/Models/Interfaces/IUserIdentifier";
import StringBuilder from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Text/StringBuilder";

export interface IUserQueryParameterGenerator {
  generateIdOrScreenNameParameter(user: IUserIdentifier, idParameterName, screenNameParameterName): string;

  generateListOfUserIdentifiersParameter(usersIdentifiers: Array<IUserIdentifier>): string;

  appendUser(query: StringBuilder, user: IUserIdentifier): void;

  appendUsers(query: StringBuilder, users: Array<IUserIdentifier>): void;
}

import {InjectionToken} from "@angular/core";

import {IUserIdentifier} from "../../Public/Models/Interfaces/IUserIdentifier";
import StringBuilder from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Text/StringBuilder";
import {UserQueryParameterGenerator} from "../../../controllers/User/UserQueryParameterGenerator";

export interface IUserQueryParameterGenerator {
  generateIdOrScreenNameParameter(user: IUserIdentifier, idParameterName?: string, screenNameParameterName?: string): string;

  generateListOfUserIdentifiersParameter(usersIdentifiers: Iterable<IUserIdentifier>): string;

  appendUser(query: StringBuilder, user: IUserIdentifier): void;

  appendUsers(query: StringBuilder, users: Iterable<IUserIdentifier>): void;
}

export const IUserQueryParameterGeneratorToken = new InjectionToken<IUserQueryParameterGenerator>('IUserQueryParameterGenerator', {
  providedIn: 'root',
  factory: () => new UserQueryParameterGenerator(),
});

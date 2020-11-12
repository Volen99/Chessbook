import {inject, Inject, InjectionToken} from "@angular/core";

import {IListParameters} from "../../Public/Parameters/ListsClient/TwitterListParameters";
import {ITwitterListIdentifier} from "../../Public/Models/Interfaces/ITwitterListIdentifier";
import {GetTweetsFromListParameters, IGetTweetsFromListParameters} from "../../Public/Parameters/ListsClient/GetTweetsFromListParameters";
import {TwitterListQueryParameterGenerator} from "../../../controllers/TwitterLists/TwitterListQueryParameterGenerator";
import {UserQueryParameterGenerator} from "../../../controllers/User/UserQueryParameterGenerator";
import StringBuilder from "typescript-dotnet-commonjs/System/Text/StringBuilder";

export interface ITwitterListQueryParameterGenerator {
  generateIdentifierParameter(twitterListIdentifier: ITwitterListIdentifier): string;

  // User Parameters
  createTweetsFromListParameters(): IGetTweetsFromListParameters;

  // Query Parameters
  appendListIdentifierParameter(query: StringBuilder, listIdentifier: ITwitterListIdentifier): void;

  appendListIdentifierParameter(query: StringBuilder, parameters: IListParameters): void;
}

export const ITwitterListQueryParameterGeneratorToken = new InjectionToken<ITwitterListQueryParameterGenerator>('ITwitterListQueryParameterGenerator', {
  providedIn: 'root',
  factory: () => new TwitterListQueryParameterGenerator(inject(UserQueryParameterGenerator), inject(GetTweetsFromListParameters)),
});

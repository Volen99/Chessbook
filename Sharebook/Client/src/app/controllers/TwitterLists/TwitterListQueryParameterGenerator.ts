import {ITwitterListQueryParameterGenerator} from "../../core/Core/QueryGenerators/ITwitterListQueryParameterGenerator";
import {
  IUserQueryParameterGenerator,
  IUserQueryParameterGeneratorToken
} from "../../core/Core/QueryGenerators/IUserQueryParameterGenerator";
import {ITwitterListIdentifier} from 'src/app/core/Public/Models/Interfaces/ITwitterListIdentifier';
import {IListParameters} from "../../core/Public/Parameters/ListsClient/TwitterListParameters";
import {UserIdentifier} from "../../core/Public/Models/UserIdentifier";
import {
  IGetTweetsFromListParameters,
  IGetTweetsFromListParametersToken
} from "../../core/Public/Parameters/ListsClient/GetTweetsFromListParameters";
import {Inject, Injectable} from "@angular/core";
import {IFactory} from "../../core/Core/Injectinvi/IFactory";
import StringBuilder from "typescript-dotnet-commonjs/System/Text/StringBuilder";
import {StringBuilderExtensions} from "../../core/Core/Extensions/stringBuilder-extensions";

@Injectable({
  providedIn: 'root',
})
export class TwitterListQueryParameterGenerator implements ITwitterListQueryParameterGenerator {
  private readonly _userQueryParameterGenerator: IUserQueryParameterGenerator;

  private readonly _getTweetsFromListParametersFactory: IFactory<IGetTweetsFromListParameters>;

  constructor(@Inject(IUserQueryParameterGeneratorToken) userQueryParameterGenerator: IUserQueryParameterGenerator,
              @Inject(IGetTweetsFromListParametersToken) getTweetsFromListParametersFactory: IFactory<IGetTweetsFromListParameters>) {
    this._userQueryParameterGenerator = userQueryParameterGenerator;
    this._getTweetsFromListParametersFactory = getTweetsFromListParametersFactory;
  }

  public generateIdentifierParameter(twitterListIdentifier: ITwitterListIdentifier): string {
    if (twitterListIdentifier.id > 0) {
      return `list_id=${twitterListIdentifier.id}`;
    }

    let ownerIdentifier: string;
    if (twitterListIdentifier.ownerId > 0) {
      ownerIdentifier = `&owner_id=${twitterListIdentifier.ownerId.toString(/*CultureInfo.InvariantCulture*/)}`;
    } else {
      ownerIdentifier = `&owner_screen_name=${twitterListIdentifier.ownerScreenName}`;
    }

    let slugParameter = `&slug=${twitterListIdentifier.slug}`;

    return `${slugParameter}${ownerIdentifier}`;
  }

  public appendListIdentifierParameter(query: StringBuilder, listIdentifierOrParameters: ITwitterListIdentifier | IListParameters): void {
    let listIdentifier: ITwitterListIdentifier;
    if (this.isITwitterListIdentifier(listIdentifierOrParameters)) {
      listIdentifier = listIdentifierOrParameters;
    } else {
      listIdentifier = listIdentifierOrParameters.list;
    }

    let owner = new UserIdentifier(listIdentifier.ownerScreenName);
    if (listIdentifier.ownerId > 0) {
      owner.id = listIdentifier.ownerId;
    }

    if (listIdentifier.id > 0) {
      StringBuilderExtensions.addParameterToQuery(query, "list_id", listIdentifier.id);
    } else {
      StringBuilderExtensions.addParameterToQuery(query, "slug", listIdentifier.slug);

      let ownerParameter = this._userQueryParameterGenerator.generateIdOrScreenNameParameter(owner, "owner_id", "owner_screen_name");
      StringBuilderExtensions.addFormattedParameterToQuery(query, ownerParameter);
    }
  }

  // Tweets From List
  public createTweetsFromListParameters(): IGetTweetsFromListParameters {
    return this._getTweetsFromListParametersFactory.create();
  }

  private isITwitterListIdentifier(listIdentifierOrParameters: any): listIdentifierOrParameters is ITwitterListIdentifier {
    return (listIdentifierOrParameters as ITwitterListIdentifier).id !== undefined;
  }
}

import {ITwitterListQueryParameterGenerator} from "../../core/Core/QueryGenerators/ITwitterListQueryParameterGenerator";
import {IUserQueryParameterGenerator} from "../../core/Core/QueryGenerators/IUserQueryParameterGenerator";
import {ITwitterListIdentifier} from 'src/app/core/Public/Models/Interfaces/ITwitterListIdentifier';
import StringBuilder from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Text/StringBuilder";
import {IListParameters} from "../../core/Public/Parameters/ListsClient/TwitterListParameters";
import {UserIdentifier} from "../../core/Public/Models/UserIdentifier";
import {IGetTweetsFromListParameters} from "../../core/Public/Parameters/ListsClient/GetTweetsFromListParameters";

export class TwitterListQueryParameterGenerator implements ITwitterListQueryParameterGenerator {
  private readonly _userQueryParameterGenerator: IUserQueryParameterGenerator;

  private readonly _getTweetsFromListParametersFactory: IFactory<IGetTweetsFromListParameters>;

  constructor(userQueryParameterGenerator: IUserQueryParameterGenerator,
              getTweetsFromListParametersFactory: IFactory<IGetTweetsFromListParameters>) {
    this._userQueryParameterGenerator = userQueryParameterGenerator;
    this._getTweetsFromListParametersFactory = getTweetsFromListParametersFactory;
  }

  public generateIdentifierParameter(twitterListIdentifier: ITwitterListIdentifier): string {
    if (twitterListIdentifier.id > 0) {
      return `list_id=${twitterListIdentifier.id}`;
    }

    let ownerIdentifier: string;
    if (twitterListIdentifier.ownerId > 0) {
      ownerIdentifier = `&owner_id=${twitterListIdentifier.ownerId.toString(CultureInfo.InvariantCulture)}`;
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
      query.addParameterToQuery("list_id", listIdentifier.id);
    } else {
      query.addParameterToQuery("slug", listIdentifier.slug);

      let ownerParameter = this._userQueryParameterGenerator.generateIdOrScreenNameParameter(owner, "owner_id", "owner_screen_name");
      query.addFormattedParameterToQuery(ownerParameter);
    }
  }

  // Tweets From List
  public createTweetsFromListParameters(): IGetTweetsFromListParameters {
    return this._getTweetsFromListParametersFactory.Create();
  }

  private isITwitterListIdentifier(listIdentifierOrParameters: any): listIdentifierOrParameters is ITwitterListIdentifier {
    return (listIdentifierOrParameters as ITwitterListIdentifier).id !== undefined;
  }
}

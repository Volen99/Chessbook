import {ITwitterListQueryParameterGenerator} from "../../core/Core/QueryGenerators/ITwitterListQueryParameterGenerator";
import {IUserQueryParameterGenerator} from "../../core/Core/QueryGenerators/IUserQueryParameterGenerator";
import {ITwitterListIdentifier} from 'src/app/core/Public/Models/Interfaces/ITwitterListIdentifier';
import {Resources} from 'src/app/properties/resources';
import StringBuilder from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Text/StringBuilder";
import {IListParameters} from "../../core/Public/Parameters/ListsClient/TwitterListParameters";
import {UserIdentifier} from "../../core/Public/Models/UserIdentifier";

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
      ownerIdentifier = string.Format(Resources.List_OwnerIdParameter, twitterListIdentifier.ownerId.ToString(CultureInfo.InvariantCulture));
    } else {
      ownerIdentifier = string.Format(Resources.List_OwnerScreenNameParameter, twitterListIdentifier.ownerScreenName);
    }

    var slugParameter = string.Format(Resources.List_SlugParameter, twitterListIdentifier.slug);

    return `${slugParameter}${ownerIdentifier}`;
  }

  public appendListIdentifierParameter(query: StringBuilder, listIdentifier: ITwitterListIdentifier): void {
    var owner = new UserIdentifier(listIdentifier.ownerScreenName);
    if (listIdentifier.ownerId > 0) {
      owner.id = listIdentifier.ownerId;
    }

    if (listIdentifier.id > 0) {
      query.addParameterToQuery("list_id", listIdentifier.id);
    } else {
      query.addParameterToQuery("slug", listIdentifier.slug);

      var ownerParameter = this._userQueryParameterGenerator.generateIdOrScreenNameParameter(owner, "owner_id", "owner_screen_name");
      query.addFormattedParameterToQuery(ownerParameter);
    }
  }

  public appendListIdentifierParameter(query: StringBuilder, parameters: IListParameters): void {
    this.appendListIdentifierParameter(query, parameters.list);
  }

  // Tweets From List
  public createTweetsFromListParameters(): IGetTweetsFromListParameters {
    return this._getTweetsFromListParametersFactory.Create();
  }
}

import {IListParameters, TwitterListParameters} from "./TwitterListParameters";
import {ITwitterListIdentifier} from "../../Models/Interfaces/ITwitterListIdentifier";
import {IUserIdentifier} from "../../Models/Interfaces/IUserIdentifier";
import {TwitterListIdentifier} from "../../Models/TwitterListIdentifier";
import Type from "typescript-dotnet-commonjs/System/Types";

// For more information visit: https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/post-lists-destroy
export interface IDestroyListParameters extends IListParameters {

}

export class DestroyListParameters extends TwitterListParameters implements IDestroyListParameters {
  constructor(listIdOrSlugOrList?: number | string | ITwitterListIdentifier, userId?: IUserIdentifier) {
    let listIdentifierCurrent: ITwitterListIdentifier;
    if (Type.isNumber(listIdOrSlugOrList)) {
      listIdentifierCurrent = new TwitterListIdentifier(listIdOrSlugOrList);
    } else if (Type.isString(listIdOrSlugOrList)) {
      listIdentifierCurrent = new TwitterListIdentifier(listIdOrSlugOrList, userId);
    } else {
      listIdentifierCurrent = listIdOrSlugOrList;
    }

    super(listIdentifierCurrent);
  }
}


// public DestroyListParameters(long listId) : this(new TwitterListIdentifier(listId))
// {
// }
//
//
// public DestroyListParameters(string slug, IUserIdentifier userId) : this(new TwitterListIdentifier(slug, userId))
// {
// }
//
// public DestroyListParameters(ITwitterListIdentifier list) : base(list)
// {
// }

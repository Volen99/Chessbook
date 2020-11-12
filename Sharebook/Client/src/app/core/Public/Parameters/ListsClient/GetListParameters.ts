import {IListParameters, TwitterListParameters} from "./TwitterListParameters";
import {TwitterListIdentifier} from "../../Models/TwitterListIdentifier";
import {ITwitterListIdentifier} from "../../Models/Interfaces/ITwitterListIdentifier";
import {IUserIdentifier} from "../../Models/Interfaces/IUserIdentifier";
import Type from "typescript-dotnet-commonjs/System/Types";

// For more information visit: https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-show
export interface IGetListParameters extends IListParameters {
}

export class GetListParameters extends TwitterListParameters implements IGetListParameters {
  constructor(listIdOrSlugOrListIdentifier?: number | string | ITwitterListIdentifier, userId?: IUserIdentifier) {
    let listCurrent: ITwitterListIdentifier;
    if (Type.isNumber(listIdOrSlugOrListIdentifier) || Type.isString(listIdOrSlugOrListIdentifier)) {
      if (!userId) {
        listCurrent = new TwitterListIdentifier(listIdOrSlugOrListIdentifier);
      } else {
        listCurrent = new TwitterListIdentifier(listIdOrSlugOrListIdentifier, userId);
      }
    } else {
      listCurrent = listIdOrSlugOrListIdentifier;
    }

    super(listCurrent);
  }
}

// public GetListParameters(long listId) : this(new TwitterListIdentifier(listId))
// {
// }
//
// public GetListParameters(string slug, IUserIdentifier userId) : this(new TwitterListIdentifier(slug, userId))
// {
// }
//
// public GetListParameters(ITwitterListIdentifier list) : base(list)
// {
// }

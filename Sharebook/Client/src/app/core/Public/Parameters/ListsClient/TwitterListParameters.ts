import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";
import {ITwitterListIdentifier} from "../../Models/Interfaces/ITwitterListIdentifier";
import {TwitterListIdentifier} from '../../Models/TwitterListIdentifier';
import Type from "typescript-dotnet-commonjs/System/Types";

export interface IListParameters extends ICustomRequestParameters {
  // Identifier of a twitter list
  list: ITwitterListIdentifier;
}

export class TwitterListParameters extends CustomRequestParameters implements IListParameters {
  constructor(listIdOrList?: number | ITwitterListIdentifier) {
    super();

    if (Type.isNumber(listIdOrList)) {
      this.list = new TwitterListIdentifier(listIdOrList);
    } else {
      this.list = listIdOrList;
    }
  }

  public list: ITwitterListIdentifier;
}

// public TwitterListParameters(long listId) : this(new TwitterListIdentifier(listId))
// {
// }

// public TwitterListParameters(ITwitterListIdentifier list)
// {
//   List = list;
// }

import {IListParameters, TwitterListParameters} from "../TwitterListParameters";
import {ITwitterListIdentifier} from "../../../Models/Interfaces/ITwitterListIdentifier";

// https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/post-lists-subscribers-destroy
export interface IUnsubscribeFromListParameters extends IListParameters {
}

export class UnsubscribeFromListParameters extends TwitterListParameters implements IUnsubscribeFromListParameters {
  constructor(listIdOrList: | number | ITwitterListIdentifier) {
    super(listIdOrList);
  }
}

// public UnsubscribeFromListParameters(long listId) : base(listId)
// {
// }
//
// public UnsubscribeFromListParameters(ITwitterListIdentifier list) : base(list)
// {
// }

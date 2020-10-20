import {IListParameters, TwitterListParameters} from "../TwitterListParameters";
import {ITwitterListIdentifier} from '../../../Models/Interfaces/ITwitterListIdentifier';

// For more information visit : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/post-lists-subscribers-create
export interface ISubscribeToListParameters extends IListParameters {
}

export class SubscribeToListParameters extends TwitterListParameters implements ISubscribeToListParameters {
  constructor(listIdOrList?: number | ITwitterListIdentifier) {
    super(listIdOrList);
  }
}

// public SubscribeToListParameters(long listId) : base(listId)
// {
// }
//
// public SubscribeToListParameters(ITwitterListIdentifier list) : base(list)
// {
// }

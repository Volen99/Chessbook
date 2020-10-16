import {BaseGetUsersOfListParameters, IBaseGetUsersOfListParameters} from "../../../../Core/Parameters/BaseGetUsersOfListParameters";
import {ITwitterListIdentifier} from "../../../Models/Interfaces/ITwitterListIdentifier";
import {TwitterListIdentifier} from '../../../Models/TwitterListIdentifier';
import {TwitterLimits} from "../../../Settings/TwitterLimits";

// For more information visit: https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-subscribers
export interface IGetListSubscribersParameters extends IBaseGetUsersOfListParameters {
}

export class GetListSubscribersParameters extends BaseGetUsersOfListParameters implements IGetListSubscribersParameters {
  constructor(listIdOrList?: number | ITwitterListIdentifier, parameters?: IGetListSubscribersParameters) {
    if (parameters) {
      super(undefined, parameters);
    } else {
      super.pageSize = TwitterLimits.DEFAULTS.LISTS_GET_SUBSCRIBERS_MAX_PAGE_SIZE;
      let list: ITwitterListIdentifier;
      if (typeof listIdOrList === 'number') {
        list = new TwitterListIdentifier(listIdOrList);
      } else if (typeof listIdOrList !== 'number') {
        list = listIdOrList;
      }

      super(list);
    }
  }
}


// public GetListSubscribersParameters(long listId) : this(new TwitterListIdentifier(listId))
// {
// }
//
// public GetListSubscribersParameters(ITwitterListIdentifier list) : base(list)
// {
//   PageSize = TwitterLimits.DEFAULTS.LISTS_GET_SUBSCRIBERS_MAX_PAGE_SIZE;
// }
//
// public GetListSubscribersParameters(IGetListSubscribersParameters parameters) : base(parameters)
// {
//   if (parameters == null)
//   {
//     PageSize = TwitterLimits.DEFAULTS.LISTS_GET_SUBSCRIBERS_MAX_PAGE_SIZE;
//   }
// }

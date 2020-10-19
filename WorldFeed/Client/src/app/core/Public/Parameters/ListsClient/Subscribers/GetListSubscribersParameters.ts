import {BaseGetUsersOfListParameters, IBaseGetUsersOfListParameters} from "../../../../Core/Parameters/BaseGetUsersOfListParameters";
import {ITwitterListIdentifier} from "../../../Models/Interfaces/ITwitterListIdentifier";
import {TwitterListIdentifier} from '../../../Models/TwitterListIdentifier';
import {TwitterLimits} from "../../../Settings/TwitterLimits";
import {IGetMembersOfListParameters} from "../Members/GetMembersOfListParameters";
import Type from "../../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Types";

// For more information visit: https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-subscribers
export interface IGetListSubscribersParameters extends IBaseGetUsersOfListParameters {
}

export class GetListSubscribersParameters extends BaseGetUsersOfListParameters implements IGetListSubscribersParameters {
  constructor(listIdOrListOrParameters: number | ITwitterListIdentifier | IGetListSubscribersParameters) {
    if (GetListSubscribersParameters.isIGetListSubscribersParameters(listIdOrListOrParameters)) {
      super(listIdOrListOrParameters);

      if (listIdOrListOrParameters == null) {
        super.pageSize = TwitterLimits.DEFAULTS.LISTS_GET_SUBSCRIBERS_MAX_PAGE_SIZE;
      }
    } else {
      let list: ITwitterListIdentifier;
      if (Type.isNumber(listIdOrListOrParameters)) {
        list = new TwitterListIdentifier(listIdOrListOrParameters);
      } else {
        list = listIdOrListOrParameters;
      }
      
      super(list);

      super.pageSize = TwitterLimits.DEFAULTS.LISTS_GET_SUBSCRIBERS_MAX_PAGE_SIZE;
    }
  }

  private static isIGetListSubscribersParameters(listIdOrListOrParameters: any): listIdOrListOrParameters is IGetListSubscribersParameters {
    return (listIdOrListOrParameters as IGetListSubscribersParameters).formattedCustomQueryParameters !== undefined;
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

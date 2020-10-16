import {BaseGetUsersOfListParameters, IBaseGetUsersOfListParameters} from "../../../../Core/Parameters/BaseGetUsersOfListParameters";
import {ITwitterListIdentifier} from "../../../Models/Interfaces/ITwitterListIdentifier";
import { TwitterListIdentifier } from '../../../Models/TwitterListIdentifier';
import {TwitterLimits} from "../../../Settings/TwitterLimits";

// For more information visit : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-members
export interface IGetMembersOfListParameters extends IBaseGetUsersOfListParameters {
}

    // @ts-ignore
export class GetMembersOfListParameters extends BaseGetUsersOfListParameters implements IGetMembersOfListParameters
    {
      constructor(listIdOrListOrParameters: number | ITwitterListIdentifier | IGetMembersOfListParameters) {
        let listOrParameters: ITwitterListIdentifier | IGetMembersOfListParameters;
        if (typeof listIdOrListOrParameters === 'number') {
          listOrParameters = new TwitterListIdentifier(listIdOrListOrParameters);
        } else if (GetMembersOfListParameters.isITwitterListIdentifier(listIdOrListOrParameters)) {
          listOrParameters = listIdOrListOrParameters;
        } else {
          listOrParameters = listIdOrListOrParameters as IGetMembersOfListParameters;
        }

        super(listOrParameters);

        super.pageSize = TwitterLimits.DEFAULTS.LISTS_GET_MEMBERS_MAX_PAGE_SIZE;
      }

      private static isITwitterListIdentifier(listIdOrListOrParameters: number | ITwitterListIdentifier | IGetMembersOfListParameters):
        listIdOrListOrParameters is ITwitterListIdentifier {
        return (listIdOrListOrParameters as ITwitterListIdentifier).id !== undefined;
      }
    }

// public GetMembersOfListParameters(long listId) : this(new TwitterListIdentifier(listId))
// {
// }
//
// public GetMembersOfListParameters(ITwitterListIdentifier list) : base(list)
// {
//   PageSize = TwitterLimits.DEFAULTS.LISTS_GET_MEMBERS_MAX_PAGE_SIZE;
// }
//
// public GetMembersOfListParameters(IGetMembersOfListParameters parameters) : base(parameters)
// {
//   if (parameters == null)
//   {
//     PageSize = TwitterLimits.DEFAULTS.LISTS_GET_MEMBERS_MAX_PAGE_SIZE;
//   }
// }

import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";

// For more information visit : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-list
export interface IGetListsSubscribedByAccountParameters extends ICustomRequestParameters {
  // Set this to true if you would like owned lists to be returned first.
  reverse?: boolean;
}

export class GetListsSubscribedByAccountParameters extends CustomRequestParameters implements IGetListsSubscribedByAccountParameters {
  constructor(parameters?: IGetListsSubscribedByAccountParameters) {
    super();
    if (parameters) {
      this.reverse = parameters?.reverse;
    }
  }

  public reverse?: boolean;
}

// public GetListsSubscribedByAccountParameters()
// {
// }
//
// public GetListsSubscribedByAccountParameters(IGetListsSubscribedByAccountParameters parameters)
// {
//   Reverse = parameters?.Reverse;
// }

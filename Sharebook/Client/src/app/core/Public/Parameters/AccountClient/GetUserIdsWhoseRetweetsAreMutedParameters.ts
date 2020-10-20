import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";

// https://dev.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-friendships-no_retweets-ids
export interface IGetUserIdsWhoseRetweetsAreMutedParameters extends ICustomRequestParameters {
}

export class GetUserIdsWhoseRetweetsAreMutedParameters extends CustomRequestParameters implements IGetUserIdsWhoseRetweetsAreMutedParameters {
  constructor(source?: IGetUserIdsWhoseRetweetsAreMutedParameters) {
    if (source) {
      super(source);
    } else {
      super();
    }
  }

}

// public GetUserIdsWhoseRetweetsAreMutedParameters()
// {
// }
//
// public GetUserIdsWhoseRetweetsAreMutedParameters(IGetUserIdsWhoseRetweetsAreMutedParameters source) : base(source)
// {
// }

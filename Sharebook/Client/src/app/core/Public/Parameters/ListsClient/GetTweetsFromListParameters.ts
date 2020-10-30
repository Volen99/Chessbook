import {Inject, Injectable, InjectionToken} from "@angular/core";

import {IListParameters} from "./TwitterListParameters";
import {ITimelineRequestParameters, TimelineRequestParameters} from "../TimelineRequestParameters";
import {ITwitterListIdentifier, ITwitterListIdentifierToken} from "../../Models/Interfaces/ITwitterListIdentifier";
import {SharebookLimits} from "../../Settings/SharebookLimits";
import {TwitterListIdentifier} from '../../Models/TwitterListIdentifier';

// For more information visit: https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-statuses
export interface IGetTweetsFromListParameters extends IListParameters, ITimelineRequestParameters {
  // Include Retweets. When this parameter is set to false, Twitter will send you the same result set but without including the retweets.
  // It means that if there are a total of 100 tweets, and the latest are 80 new tweets and 20 retweets.
  // If the MaximumResultSet is set to 100, you will receive 80 tweets and not 100 even if there is more than 80 new tweets in the Timeline.
  includeRetweets?: boolean;
}

export const IGetTweetsFromListParametersToken = new InjectionToken<IGetTweetsFromListParameters>('IGetTweetsFromListParameters', {
  providedIn: 'root',
  factory: () => new GetTweetsFromListParameters(),
});

@Injectable()
export class GetTweetsFromListParameters extends TimelineRequestParameters implements IGetTweetsFromListParameters {
  constructor(@Inject([ITwitterListIdentifierToken, IGetTweetsFromListParametersToken]) listIdOrListOrSource?: number | ITwitterListIdentifier | IGetTweetsFromListParameters) {
    if (GetTweetsFromListParameters.isIGetTweetsFromListParameters(listIdOrListOrSource)) {
      super(listIdOrListOrSource);
      this.list = listIdOrListOrSource.list;
      this.includeRetweets = listIdOrListOrSource.includeRetweets;
    } else {
      super();

      super.pageSize = SharebookLimits.DEFAULTS.LISTS_GET_TWEETS_MAX_PAGE_SIZE;

      if (typeof listIdOrListOrSource === 'number') {
        this.list = new TwitterListIdentifier(listIdOrListOrSource);
      } else {
        this.list = listIdOrListOrSource;
      }
    }
  }

  public list: ITwitterListIdentifier;

  public includeRetweets?: boolean;

  private static isIGetTweetsFromListParameters(listIdOrListOrSource: number | ITwitterListIdentifier | IGetTweetsFromListParameters):
    listIdOrListOrSource is IGetTweetsFromListParameters {
    return (listIdOrListOrSource as IGetTweetsFromListParameters).includeRetweets !== undefined;
  }
}


// public GetTweetsFromListParameters(long listId) : this(new TwitterListIdentifier(listId))
// {
// }
//
// public GetTweetsFromListParameters(ITwitterListIdentifier list)
// {
//   List = list;
//   PageSize = TwitterLimits.DEFAULTS.LISTS_GET_TWEETS_MAX_PAGE_SIZE;
// }
//
// public GetTweetsFromListParameters(IGetTweetsFromListParameters source) : base(source)
// {
//   if (source == null)
//   {
//     PagwoteSize = TwitterLimits.DEFAULTS.LISTS_GET_TWEETS_MAX_PAGE_SIZE;
//     return;
//   }
//
//   List = source.List;
//   IncludeRetweets = source.IncludeRetweets;
// }

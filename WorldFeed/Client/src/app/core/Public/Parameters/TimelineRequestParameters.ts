import {IMinMaxQueryParameters, MinMaxQueryParameters} from "./MaxAndMinBaseQueryParameters";
import {ITweetModeParameter} from "./ITweetModeParameter";
import {TweetMode} from '../Settings/TweetinviSettings';

export interface ITimelineRequestParameters extends IMinMaxQueryParameters, ITweetModeParameter {
  // If set to true, the creator property (IUser) will only contain the id.
  trimUser?: boolean;

  // Include tweet entities.
  includeEntities?: boolean;
}

export abstract class TimelineRequestParameters extends MinMaxQueryParameters implements ITimelineRequestParameters {
  protected constructor(source?: ITimelineRequestParameters) {
    if (source) {
      super(source);
      this.trimUser = source?.trimUser;
      this.includeEntities = source?.includeEntities;
      this.tweetMode = source?.tweetMode;
    }
  }

  public trimUser?: boolean;
  public includeEntities?: boolean;
  public tweetMode?: TweetMode;
}

// protected TimelineRequestParameters()
// {
// }
//
// protected TimelineRequestParameters(ITimelineRequestParameters source) : base(source)
// {
//   TrimUser = source?.TrimUser;
//   IncludeEntities = source?.IncludeEntities;
//   TweetMode = source?.TweetMode;
// }

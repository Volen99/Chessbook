import {IMinMaxQueryParameters, MinMaxQueryParameters} from "./MaxAndMinBaseQueryParameters";
import {ITweetModeParameter} from "./ITweetModeParameter";
import {TweetMode} from '../Settings/SharebookSettings';

export interface ITimelineRequestParameters extends IMinMaxQueryParameters, ITweetModeParameter {
  // If set to true, the creator property (IUser) will only contain the id.
  trimUser: boolean | null;

  // Include tweet entities.
  includeEntities: boolean | null;
}

export abstract class TimelineRequestParameters extends MinMaxQueryParameters implements ITimelineRequestParameters {
  protected constructor(source?: ITimelineRequestParameters) {
    if (source) {
      super(source);

      this.trimUser = source?.trimUser;
      this.includeEntities = source?.includeEntities;
      this.tweetMode = source?.tweetMode;
    } else {
      super();
    }
  }

  public trimUser: boolean | null;
  public includeEntities: boolean | null;
  public tweetMode: TweetMode | null;
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

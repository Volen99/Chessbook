import {IMinMaxQueryParameters, MinMaxQueryParameters} from "./MaxAndMinBaseQueryParameters";
import {ITweetModeParameter} from "./ITweetModeParameter";
import {TweetMode} from '../Settings/TweetinviSettings';

export interface ITimelineRequestParameters extends IMinMaxQueryParameters, ITweetModeParameter {
  // If set to true, the creator property (IUser) will only contain the id.
  TrimUser?: boolean;

  // Include tweet entities.
  IncludeEntities?: boolean;
}

export abstract class TimelineRequestParameters extends MinMaxQueryParameters implements ITimelineRequestParameters {
  protected constructor(source?: ITimelineRequestParameters) {
    if (source) {
      super(source);
      this.TrimUser = source?.TrimUser;
      this.IncludeEntities = source?.IncludeEntities;
      this.TweetMode = source?.TweetMode;
    }
  }

  public TrimUser?: boolean;
  public IncludeEntities?: boolean;
  public TweetMode?: TweetMode;
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

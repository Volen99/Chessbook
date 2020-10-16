import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";
import {TweetMode} from "../../Settings/TweetinviSettings";

export interface ICreateTrackedTweetStreamParameters extends ICustomRequestParameters {
  // Decide whether to use Extended or Compat mode
  TweetMode?: TweetMode;
}

export class CreateTrackedTweetStreamParameters extends CustomRequestParameters implements ICreateTrackedTweetStreamParameters {
  public TweetMode?: TweetMode;
}

import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";
import {TweetMode} from '../../Settings/TweetinviSettings';

export interface ICreateTweetStreamParameters extends ICustomRequestParameters {
  // Decide whether to use Extended or Compat mode
  tweetMode?: TweetMode;
}

export class CreateTweetStreamParameters extends CustomRequestParameters implements ICreateTweetStreamParameters {
  public tweetMode?: TweetMode;
}

import {TweetMode} from "../../Public/Settings/TweetinviSettings";
import {ITweetModeParameter} from "../../Public/Parameters/ITweetModeParameter";
import {ITwitterRequest} from "../../Public/Models/Interfaces/ITwitterRequest";

export class ComputedTweetMode {
  private readonly _tweetMode?: TweetMode;

  constructor(parameter?: ITweetModeParameter, request?: ITwitterRequest, tweetMode: TweetMode) {
    if (tweetMode) {
      this._tweetMode = tweetMode;
    } else {
      this._tweetMode = parameter?.TweetMode ?? request.executionContext.TweetMode;
    }
  }

        public static implicit operator TweetMode?(computedTweetMode: ComputedTweetMode)
        {
            return computedTweetMode._tweetMode;
        }

        public toString(): string {
            if (this._tweetMode === TweetMode.None) {
                return null;
            }

            return this._tweetMode?.toString().toLocaleLowerCase();
        }

        // public static ComputedTweetMode Extended => new ComputedTweetMode(TweetMode.Extended);

      static get extended(): ComputedTweetMode {
          return new ComputedTweetMode(undefined, undefined, TweetMode.Extended);
        }
    }

// public ComputedTweetMode(ITweetModeParameter parameter, ITwitterRequest request)
// {
//   _tweetMode = parameter?.TweetMode ?? request.ExecutionContext.TweetMode;
// }

// private ComputedTweetMode(TweetMode tweetMode)
// {
//   _tweetMode = tweetMode;
// }

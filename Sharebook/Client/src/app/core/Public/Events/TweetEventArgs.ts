import {EventArgs} from "../../../c#-objects/TypeScript.NET-Core/packages/Events/source/EventArgs";
import {ITweet} from "../Models/Interfaces/ITweet";
import {ILocation} from "../Models/Interfaces/ILocation";
import {MatchOn} from '../Streaming/MatchOn';
import {ITweetLocationRemovedInfo} from "../Streaming/Events/ITweetLocationRemovedInfo";
import {ITweetWitheldInfo} from '../Streaming/Events/ITweetWitheldInfo';

export class TweetEventArgs extends EventArgs {
  constructor(tweet: ITweet, json: string) {
    super();
    this.Tweet = tweet;
    this.Json = json;
  }

  public Tweet: ITweet;
  public Json: string;
}

// Event informing that a tweet was received by a stream
export class TweetReceivedEventArgs extends TweetEventArgs {
  constructor(tweet: ITweet, json: string) {
    super(tweet, json);
  }
}

// Event informing that a tweet matching a stream criteria has been received
export class MatchedTweetReceivedEventArgs extends TweetEventArgs {
  constructor(tweet: ITweet, json: string) {
    super(tweet, json);
  }

  public MatchingTracks: string[];
  public MatchingLocations: ILocation[];
  public MatchingFollowers: number[];
  public MatchOn: MatchOn;

  public RetweetMatchingTracks: string[];
  public RetweetMatchingLocations: ILocation[];
  public RetweetMatchingFollowers: number[];
  public RetweetMatchOn: MatchOn;

  public QuotedTweetMatchingTracks: string[];
  public QuotedTweetMatchingLocations: ILocation[];
  public QuotedTweetMatchingFollowers: number[];
  public QuotedTweetMatchOn: MatchOn;
}

export class TweetLocationDeletedEventArgs extends EventArgs {
  constructor(tweetLocationRemovedInfo: ITweetLocationRemovedInfo) {
    super();
    this.TweetLocationRemovedInfo = tweetLocationRemovedInfo;
  }

  public TweetLocationRemovedInfo: ITweetLocationRemovedInfo;
}

export class TweetWitheldEventArgs extends EventArgs {
  constructor(tweetWitheldInfo: ITweetWitheldInfo) {
    super();
    this.TweetWitheldInfo = tweetWitheldInfo;
  }

  public TweetWitheldInfo: ITweetWitheldInfo;
}

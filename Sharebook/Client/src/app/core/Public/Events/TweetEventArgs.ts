import {ITweet} from "../Models/Interfaces/ITweet";
import {ILocation} from "../Models/Interfaces/ILocation";
import {MatchOn} from '../Streaming/MatchOn';
import {ITweetLocationRemovedInfo} from "../Streaming/Events/ITweetLocationRemovedInfo";
import {ITweetWitheldInfo} from '../Streaming/Events/ITweetWitheldInfo';

export class TweetEventArgs /*extends EventArgs*/ {
  constructor(tweet: ITweet, json: string) {
    // super();

    this.tweet = tweet;
    this.json = json;
  }

  public tweet: ITweet;
  public json: string;
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

  public matchingTracks: string[];
  public matchingLocations: ILocation[];
  public matchingFollowers: number[];
  public matchOn: MatchOn;

  public retweetMatchingTracks: string[];
  public retweetMatchingLocations: ILocation[];
  public retweetMatchingFollowers: number[];
  public retweetMatchOn: MatchOn;

  public quotedTweetMatchingTracks: string[];
  public quotedTweetMatchingLocations: ILocation[];
  public quotedTweetMatchingFollowers: number[];
  public quotedTweetMatchOn: MatchOn;
}

export class TweetLocationDeletedEventArgs /*extends EventArgs*/ {
  constructor(tweetLocationRemovedInfo: ITweetLocationRemovedInfo) {
   // super();

    this.tweetLocationRemovedInfo = tweetLocationRemovedInfo;
  }

  public tweetLocationRemovedInfo: ITweetLocationRemovedInfo;
}

export class TweetWitheldEventArgs /*extends EventArgs*/ {
  constructor(tweetWitheldInfo: ITweetWitheldInfo) {
   // super();

    this.tweetWitheldInfo = tweetWitheldInfo;
  }

  public tweetWitheldInfo: ITweetWitheldInfo;
}

import {EventEmitter} from "@angular/core";

import {ITweetinviEvents} from "../core/Core/Events/TweetinviGlobalEvents";
import {ITwitterClient} from "../core/Public/ITwitterClient";
import {BeforeExecutingRequestEventArgs} from "../core/Public/Events/BeforeExecutingRequestEventArgs";
import {AfterExecutingQueryEventArgs} from '../core/Public/Events/AfterExecutingQueryEventArgs';
import {SharebookException} from "../core/Public/Exceptions/SharebookException";

// Take power and control the execution of requests based on the state of your environment!
export abstract class TweetinviEvents {
  // private static readonly _tweetinviEvents: ITweetinviEvents;

  constructor() {
    // this._tweetinviEvents = TweetinviContainer.Resolve<ITweetinviEvents>();
  }

  public static SubscribeToClientEvents(client: ITwitterClient): void {
    // TweetinviEvents._tweetinviEvents.subscribeToClientEvents(client);
  }

  // #bidenharris2020 💙💙💙
  public static UnsubscribeFromClientEvents(client: ITwitterClient): void {
    // TweetinviEvents._tweetinviEvents.unsubscribeFromClientEvents(client);
  }

  // public static BeforeWaitingForRequestRateLimits: EventEmitter<BeforeExecutingRequestEventArgs>;
  // {
  //     add => _tweetinviEvents.BeforeWaitingForRequestRateLimits += value;
  //     remove => _tweetinviEvents.BeforeWaitingForRequestRateLimits -= value;
  // }


  // public static  BeforeExecutingRequest: EventEmitter<BeforeExecutingRequestEventArgs>
  // {
  //     add => _tweetinviEvents.BeforeExecutingRequest += value;
  //     remove => _tweetinviEvents.BeforeExecutingRequest -= value;
  // }
  //
  // public static  AfterExecutingRequest: EventEmitter<AfterExecutingQueryEventArgs>
  // {
  //     add => _tweetinviEvents.AfterExecutingRequest += value;
  //     remove => _tweetinviEvents.AfterExecutingRequest -= value;
  // }
  //
  // public static  OnTwitterException: EventEmitter<SharebookException>
  // {
  //     add => _tweetinviEvents.OnTwitterException += value;
  //     remove => _tweetinviEvents.OnTwitterException -= value;
  // }
}

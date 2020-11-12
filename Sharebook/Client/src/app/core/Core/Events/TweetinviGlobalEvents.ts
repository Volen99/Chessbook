import {EventEmitter, Injectable, InjectionToken} from "@angular/core";

import {ISharebookException} from "../Exceptions/ISharebookException";
import {AfterExecutingQueryEventArgs} from "../../Public/Events/AfterExecutingQueryEventArgs";
import {BeforeExecutingRequestEventArgs} from "../../Public/Events/BeforeExecutingRequestEventArgs";
import {ITwitterClient} from "../../Public/ITwitterClient";

export interface ITweetinviEvents extends ITwitterClientEvents {
  subscribeToClientEvents(client: ITwitterClient): void;

  unsubscribeFromClientEvents(client: ITwitterClient): void;
}

@Injectable({
  providedIn: 'root',
})
export class TwitterClientEvents implements ITwitterClientEvents {
  AfterExecutingRequest: EventEmitter<AfterExecutingQueryEventArgs>;
  BeforeExecutingRequest: EventEmitter<BeforeExecutingRequestEventArgs>;
  BeforeWaitingForRequestRateLimits: EventEmitter<BeforeExecutingRequestEventArgs>;
  OnTwitterException: EventEmitter<ISharebookException>;

  RaiseAfterExecutingQuery(afterExecutingQueryEventArgs: AfterExecutingQueryEventArgs): void {
  }

  RaiseBeforeExecutingQuery(beforeExecutingRequestExecutedEventArgs: BeforeExecutingRequestEventArgs): void {
  }

  RaiseBeforeWaitingForQueryRateLimits(beforeExecutingRequestExecutedEventArgs: BeforeExecutingRequestEventArgs): void {
  }

  RaiseOnTwitterException(exception: ISharebookException): void {
  }
  // public event BeforeWaitingForRequestRateLimits:  EventHandler<BeforeExecutingRequestEventArgs>;
  // protected  RaiseBeforeWaitingForQueryRateLimits(sender: object, beforeExecutingRequestAfterExecuteEventArgs: BeforeExecutingRequestEventArgs): void {
  //     BeforeWaitingForRequestRateLimits?.Invoke(sender, beforeExecutingRequestAfterExecuteEventArgs);
  // }
  // public  RaiseBeforeWaitingForQueryRateLimits(beforeExecutingRequestAfterExecuteEventArgs: BeforeExecutingRequestEventArgs): void
  // {
  //     this.Raise(BeforeWaitingForRequestRateLimits, beforeExecutingRequestAfterExecuteEventArgs);
  // }
  //
  // public event BeforeExecutingRequest: EventHandler<BeforeExecutingRequestEventArgs>;
  // protected  RaiseBeforeExecutingQuery(sender: object, beforeExecutingRequestExecutedEventArgs: BeforeExecutingRequestEventArgs): void
  // {
  //     BeforeExecutingRequest?.Invoke(sender, beforeExecutingRequestExecutedEventArgs);
  // }
  // public  RaiseBeforeExecutingQuery(beforeExecutingRequestExecutedEventArgs: BeforeExecutingRequestEventArgs): void
  // {
  //     this.Raise(BeforeExecutingRequest, beforeExecutingRequestExecutedEventArgs);
  // }
  //
  // public event AfterExecutingRequest: EventHandler<AfterExecutingQueryEventArgs>;
  // protected  RaiseAfterExecutingQuery(sender: object, afterExecutingQueryEventArgs: AfterExecutingQueryEventArgs): void
  // {
  //     AfterExecutingRequest?.Invoke(sender, afterExecutingQueryEventArgs);
  // }
  // public  RaiseAfterExecutingQuery(afterExecutingQueryEventArgs: AfterExecutingQueryEventArgs): void
  // {
  //     this.Raise(AfterExecutingRequest, afterExecutingQueryEventArgs);
  // }
  //
  // public event OnTwitterException: EventHandler<ISharebookException>;
  // protected RaiseOnTwitterException(sender: object, exception: ISharebookException): void
  // {
  //     OnTwitterException?.Invoke(sender, exception);
  // }
  // public  RaiseOnTwitterException(exception: ISharebookException): void
  // {
  //     this.Raise(OnTwitterException, exception);
  // }
}

export class TweetinviGlobalEvents extends TwitterClientEvents implements ITweetinviEvents {
  public SubscribeToClientEvents(client: ITwitterClient): void {
    // client.events.BeforeWaitingForRequestRateLimits.subscribe(this.RaiseBeforeWaitingForQueryRateLimits);
    // client.events.BeforeExecutingRequest += RaiseBeforeExecutingQuery;
    // client.events.AfterExecutingRequest += RaiseAfterExecutingQuery;
    // client.events.OnTwitterException += RaiseOnTwitterException;
  }

  public UnsubscribeFromClientEvents(client: ITwitterClient): void {
    // client.events.BeforeWaitingForRequestRateLimits.(this.RaiseBeforeWaitingForQueryRateLimits);
    // client.events.BeforeExecutingRequest -= RaiseBeforeExecutingQuery;
    // client.events.AfterExecutingRequest -= RaiseAfterExecutingQuery;
    // client.events.OnTwitterException -= RaiseOnTwitterException;
  }

  AfterExecutingRequest: EventEmitter<AfterExecutingQueryEventArgs>;
  BeforeExecutingRequest: EventEmitter<BeforeExecutingRequestEventArgs>;
  BeforeWaitingForRequestRateLimits: EventEmitter<BeforeExecutingRequestEventArgs>;
  OnTwitterException: EventEmitter<ISharebookException>;

  RaiseAfterExecutingQuery(afterExecutingQueryEventArgs: AfterExecutingQueryEventArgs): void {
  }

  RaiseBeforeExecutingQuery(beforeExecutingRequestExecutedEventArgs: BeforeExecutingRequestEventArgs): void {
  }

  RaiseBeforeWaitingForQueryRateLimits(beforeExecutingRequestExecutedEventArgs: BeforeExecutingRequestEventArgs): void {
  }

  RaiseOnTwitterException(exception: ISharebookException): void {
  }

  subscribeToClientEvents(client: ITwitterClient): void {
  }

  unsubscribeFromClientEvents(client: ITwitterClient): void {
  }
}

// https://linvi.github.io/tweetinvi/dist/twitter-client/events.html - docs
export interface IExternalClientEvents {
  // This is the first event raised. This event is raised before executing a request when the rate limits for the query have been retrieved.
  // At that stage you have the information regarding how many requests can be performed and how long you have to wait if no more request are available.
  // This event will let you log, modify, cancel a request. Use this event if you wish to manually handle rate limits
  BeforeWaitingForRequestRateLimits: EventEmitter<BeforeExecutingRequestEventArgs>;

  // Event raised before executing a request. At that stage we have waited for rate limits to be available.
  // The request will be executed right after this event.
  BeforeExecutingRequest: EventEmitter<BeforeExecutingRequestEventArgs>;

  // Event raised after a request has been performed, this event will let you log the query and check the result/exception.
  AfterExecutingRequest: EventEmitter<AfterExecutingQueryEventArgs>;

  // Event raised when an exception is returned by the TwitterApi service
  OnTwitterException: EventEmitter<ISharebookException>;
}

export interface ITwitterClientEvents extends IExternalClientEvents {
  RaiseBeforeWaitingForQueryRateLimits(beforeExecutingRequestExecutedEventArgs: BeforeExecutingRequestEventArgs): void;

  RaiseBeforeExecutingQuery(beforeExecutingRequestExecutedEventArgs: BeforeExecutingRequestEventArgs): void;

  RaiseAfterExecutingQuery(afterExecutingQueryEventArgs: AfterExecutingQueryEventArgs): void;

  RaiseOnTwitterException(exception: ISharebookException): void;
}

export const ITwitterClientEventsToken = new InjectionToken<ITwitterClientEvents>('ITwitterClientEvents', {
  providedIn: 'root',
  factory: () => new TwitterClientEvents(),
});



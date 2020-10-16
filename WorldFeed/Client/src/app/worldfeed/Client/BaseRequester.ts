import {ITwitterRequest} from "src/app/core/Public/Models/Interfaces/ITwitterRequest";
import {TwitterException} from "../../core/Public/Exceptions/TwitterException";
import {ITwitterClient} from "../../core/Public/ITwitterClient";
import Tweetinvi from "../../core/Core/Events/TweetinviGlobalEvents";
import ITwitterClientEvents = Tweetinvi.Core.Events.ITwitterClientEvents;

export interface IBaseRequester {
}

export abstract class BaseRequester implements IBaseRequester {
  protected TwitterClient: ITwitterClient;
  private readonly _twitterClientEvents: ITwitterClientEvents;

  protected constructor(client: ITwitterClient, twitterClientEvents: ITwitterClientEvents) {
    this._twitterClientEvents = twitterClientEvents;
    this.TwitterClient = client;
  }

  public CreateRequest(): ITwitterRequest {
    return this.TwitterClient.CreateRequest();
  }

  // 101% buggy
  protected async ExecuteRequestAsync<T = void>(action: (request?: ITwitterRequest) => Promise<T>, request?: ITwitterRequest): Promise<T> {
    try {
      if (request) {
        let result: void | T = await action();

        if (result) {
          return result;
        }
      } else {
        let requestNew: ITwitterRequest = this.TwitterClient.CreateRequest();
        await action(requestNew);
      }
    } catch (ex: TwitterException) {
      this._twitterClientEvents.RaiseOnTwitterException(ex);
      throw;
    }
  }


  // protected async ExecuteRequestAsync(action: Func<Promise<void>>, request: ITwitterRequest): Promise<void>
  // {
  //     try
  //     {
  //         await action().ConfigureAwait(false);
  //     }
  //     catch (ex: TwitterException)
  //     {
  //         this._twitterClientEvents.RaiseOnTwitterException(ex);
  //         throw;
  //     }
  // }

  // protected async ExecuteRequestAsync(action: Func<ITwitterRequest, Promise<void>>): Promise<void>
  // {
  //     try
  //     {
  //         let request = this.TwitterClient.CreateRequest();
  //         await action(request).ConfigureAwait(false);
  //     }
  //     catch (ex: TwitterException)
  //     {
  //         this._twitterClientEvents.RaiseOnTwitterException(ex);
  //         throw;
  //     }
  // }

  // protected async ExecuteRequestAsync<T>(action: Func<ITwitterRequest, Promise<T>>): Promise<T> {
  //   try {
  //     let request = this.TwitterClient.CreateRequest();
  //     return await action(request).ConfigureAwait(false);
  //   } catch (ex: TwitterException) {
  //     this._twitterClientEvents.RaiseOnTwitterException(ex);
  //     throw;
  //   }
  // }
  //
  //   protected async ExecuteRequestAsync<T>(action: Func<Promise<T>>, request: ITwitterRequest): Promise<T>
  //   {
  //       try
  //       {
  //           return await action().ConfigureAwait(false);
  //       }
  //       catch (ex: TwitterException)
  //       {
  //           this._twitterClientEvents.RaiseOnTwitterException(ex);
  //           throw;
  //       }
  //   }
}


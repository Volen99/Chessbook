import {inject, Inject, InjectionToken} from "@angular/core";

import {ITwitterResult} from "../../../Core/Web/TwitterResult";
import {ITwitterRequest} from "../../Models/Interfaces/ITwitterRequest";
import {ITwitterQuery} from "../../Models/Interfaces/ITwitterQuery";
import {ExecuteRequester} from "../../../../sharebook/Client/Requesters/ExecuteRequester";
import {TwitterClientEvents} from "../../../Core/Events/TweetinviGlobalEvents";
import {TwitterClient} from "../../../../sharebook/TwitterClient";
import {TwitterAccessor} from "../../../../Tweetinvi.Credentials/TwitterAccessor";

export interface IExecuteRequester {
  // // Execute a custom request
  // // <returns>The raw response from twitter with the json parsed into a Data Transfer Object</returns>
  // requestAsync<T>(configureRequest: (req: ITwitterRequest) => void): Promise<ITwitterResult<T>>;
  //
  // // Execute a custom request
  // // <returns>The raw response from Twitter</returns>
  // requestAsync(configureRequest: (req: ITwitterRequest) => void): Promise<ITwitterResult>;
  //
  // // Execute a custom query
  // // <returns>The raw response from twitter with the json parsed into a Data Transfer Object</returns>
  // requestAsync<T>(configureQuery: (query: ITwitterQuery) => void): Promise<ITwitterResult<T>>;
  //
  // // Execute a custom query
  // // <returns>The raw response from Twitter</returns>
  // requestAsync(configureQuery: (query: ITwitterQuery) => void): Promise<ITwitterResult>;

  requestAsync<T = any>(configureRequestOrConfigureQuery: (twitterRequestOrQuery: ITwitterRequest | ITwitterQuery) => void): Promise<ITwitterResult<T>> | Promise<ITwitterResult>;

  prepareTwitterRequestAsync(configureQuery: (queryOrReq: ITwitterQuery | ITwitterRequest) => void): Promise<ITwitterRequest>;
}

export const IExecuteRequesterToken = new InjectionToken<IExecuteRequester>('IExecuteRequester', {
  providedIn: 'root',
  factory: () => new ExecuteRequester(inject(TwitterClient), inject(TwitterClientEvents),
    inject(TwitterAccessor)),
});

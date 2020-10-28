import {Inject, InjectionToken} from "@angular/core";

import {ITwitterRequest} from "../../Models/Interfaces/ITwitterRequest";
import {ITwitterResult} from "../../../Core/Web/TwitterResult";
import {ITwitterQuery} from "../../Models/Interfaces/ITwitterQuery";
import {ExecuteClient} from "../../../../sharebook/Client/Clients/ExecuteClient";
import {ExecuteRequester} from "../../../../sharebook/Client/Requesters/ExecuteRequester";

export interface IExecuteClient {
  // Execute a custom request
  // <returns>The raw response from twitter with the json parsed into a Data Transfer Object</returns>
  advanceRequestAsync<T>(configureRequest: (twitterRequest: ITwitterRequest) => void): Promise<ITwitterResult<T>>;

  // Execute a custom request
  // <returns>The raw response from Twitter</returns>
  advanceRequestAsync(configureRequest: (twitterRequest: ITwitterRequest) => void): Promise<ITwitterResult>;

  // Execute a custom query
  // <returns>The raw response from twitter with the json parsed into a Data Transfer Object</returns>
  requestAsync<T>(configureQuery: (twitterQuery: ITwitterQuery) => void): Promise<ITwitterResult<T>>;

  // Execute a custom query
  // <returns>The raw response from Twitter</returns>
  requestAsync(configureQuery: (twitterQuery: ITwitterQuery) => void): Promise<ITwitterResult>;
}

export const IExecuteClientToken = new InjectionToken<IExecuteClient>('IExecuteClient', {
  providedIn: 'root',
  factory: () => new ExecuteClient(Inject(ExecuteRequester)),
});

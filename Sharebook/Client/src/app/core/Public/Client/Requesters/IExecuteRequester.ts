import {ITwitterResult} from "../../../Core/Web/TwitterResult";
import {ITwitterRequest} from "../../Models/Interfaces/ITwitterRequest";
import {ITwitterQuery} from "../../Models/Interfaces/ITwitterQuery";
import {IBaseCursorQueryDTO} from "../../Models/Interfaces/DTO/QueryDTO/IBaseCursorQueryDTO";
import {InjectionToken} from "@angular/core";

export interface IExecuteRequester {
  // Execute a custom request
  // <returns>The raw response from twitter with the json parsed into a Data Transfer Object</returns>
  requestAsync<T>(configureRequest: (req: ITwitterRequest) => void): Promise<ITwitterResult<T>>;

  // Execute a custom request
  // <returns>The raw response from Twitter</returns>
  requestAsync(configureRequest: (req: ITwitterRequest) => void): Promise<ITwitterResult>;

  // Execute a custom query
  // <returns>The raw response from twitter with the json parsed into a Data Transfer Object</returns>
  requestAsync<T>(configureQuery: (query: ITwitterQuery) => void): Promise<ITwitterResult<T>>;

  // Execute a custom query
  // <returns>The raw response from Twitter</returns>
  requestAsync(configureQuery: (query: ITwitterQuery) => void): Promise<ITwitterResult>;

  prepareTwitterRequestAsync(configureQuery: (query: ITwitterQuery) => void): Promise<ITwitterRequest>;

  prepareTwitterRequestAsync(configureRequest: (req: ITwitterRequest) => void): Promise<ITwitterRequest>;
}

export const IExecuteRequesterToken = new InjectionToken<IExecuteRequester>('IExecuteRequester', {
  providedIn: 'root',
  factory: () => new,
});

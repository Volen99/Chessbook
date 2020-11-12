import {IWebhooksRequest} from "./IWebhooksRequest";

export interface IAccountActivityRequestHandler {
  isRequestManagedByTweetinviAsync(request: IWebhooksRequest): Promise<boolean>;

  tryRouteRequestAsync(request: IWebhooksRequest): Promise<boolean>;

  getAccountActivityStream(userId: number, environment: string): any; // IAccountActivityStream;
}

import {IWebhooksRequest} from "./IWebhooksRequest";
import {IAccountActivityStream} from "../../Streaming/IAccountActivityStream";

export interface IAccountActivityRequestHandler {
  isRequestManagedByTweetinviAsync(request: IWebhooksRequest): Promise<boolean>;

  tryRouteRequestAsync(request: IWebhooksRequest): Promise<boolean>;

  getAccountActivityStream(userId: number, environment: string): IAccountActivityStream;
}

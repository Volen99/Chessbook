import {inject, Inject, InjectionToken} from "@angular/core";

import {ITwitterRequest} from "../../Public/Models/Interfaces/ITwitterRequest";
import {ITwitterClientHandler} from "./ITwitterClientHandler";
import {ITwitterResponse} from "./ITwitterResponse";
import {WebRequestExecutor} from "../../../webLogic/WebRequestExecutor";
import {TwitterExceptionFactory} from "../../Public/Exceptions/SharebookException";
import {HttpClientWebHelper} from "../../../webLogic/HttpClientWebHelper";
import {TwitterResponse} from "../../../webLogic/TwitterResponse";

// Generate a Token that can be used to perform OAuth queries
export interface IWebRequestExecutor {
  // Execute a TwitterQuery and return the resulting json data.
  executeQueryAsync(request: ITwitterRequest, handler?: ITwitterClientHandler): Promise<ITwitterResponse>;

  // Execute a multipart TwitterQuery and return the resulting json data.
  executeMultipartQueryAsync(request: ITwitterRequest): Promise<ITwitterResponse>;
}

export const IWebRequestExecutorToken = new InjectionToken<IWebRequestExecutor>('IWebRequestExecutor', {
  providedIn: 'root',
  factory: () => new WebRequestExecutor(inject(TwitterExceptionFactory), inject(HttpClientWebHelper),
    inject(TwitterResponse)),
});

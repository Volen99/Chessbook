import {inject, Inject, InjectionToken} from "@angular/core";

import {ITwitterRequest} from "../../Public/Models/Interfaces/ITwitterRequest";
import {ITwitterResult, TwitterResultFactory} from "./TwitterResult";
import {TwitterAccessor} from "../../../Tweetinvi.Credentials/TwitterAccessor";
import {TwitterRequestHandler} from "../../../webLogic/TwitterRequestHandler";

export interface ITwitterAccessor {
  executeRequestAsync(request: ITwitterRequest): Promise<ITwitterResult>;

  executeRequestGenericAsync<T>(request: ITwitterRequest): Promise<ITwitterResult<T>>;

  prepareTwitterRequestAsync(request: ITwitterRequest): Promise<void>;
}

export const ITwitterAccessorToken = new InjectionToken<ITwitterAccessor>('ITwitterAccessor', {
  providedIn: 'root',
  factory: () => new TwitterAccessor(inject(TwitterRequestHandler), inject(TwitterResultFactory)),
});

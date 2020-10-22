import {ITwitterRequest} from "../../Public/Models/Interfaces/ITwitterRequest";
import {ITwitterResult} from "./TwitterResult";
import {InjectionToken} from "@angular/core";

export interface ITwitterAccessor {
  executeRequestAsync(request: ITwitterRequest): Promise<ITwitterResult>;

  executeRequestAsync<T>(request: ITwitterRequest): Promise<ITwitterResult<T>>;

  prepareTwitterRequestAsync(request: ITwitterRequest): Promise<void>;
}

export const ITwitterAccessorToken = new InjectionToken<ITwitterAccessor>('ITwitterAccessor', {
  providedIn: 'root',
  factory: () => new TwitterAccessor(),
});

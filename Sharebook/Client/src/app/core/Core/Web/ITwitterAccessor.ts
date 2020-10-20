import {ITwitterRequest} from "../../Public/Models/Interfaces/ITwitterRequest";
import {ITwitterResult} from "./TwitterResult";

export interface ITwitterAccessor {
  executeRequestAsync(request: ITwitterRequest): Promise<ITwitterResult>;

  executeRequestAsync<T>(request: ITwitterRequest): Promise<ITwitterResult<T>>;

  prepareTwitterRequestAsync(request: ITwitterRequest): Promise<void>;
}

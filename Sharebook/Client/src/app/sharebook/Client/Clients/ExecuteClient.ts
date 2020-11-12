import {Inject, Injectable} from "@angular/core";

import {ITwitterResult} from "../../../core/Core/Web/TwitterResult";
import {ITwitterRequest} from "../../../core/Public/Models/Interfaces/ITwitterRequest";
import {ITwitterQuery} from 'src/app/core/Public/Models/Interfaces/ITwitterQuery';
import {IExecuteClient} from "../../../core/Public/Client/Clients/IExecuteClient";
import {IExecuteRequester, IExecuteRequesterToken} from "../../../core/Public/Client/Requesters/IExecuteRequester";

@Injectable({
  providedIn: 'root',
})
export class ExecuteClient implements IExecuteClient {
  private readonly _executeRequester: IExecuteRequester;

  constructor(@Inject(IExecuteRequesterToken) executeRequester: IExecuteRequester) {
    this._executeRequester = executeRequester;
  }

  public advanceRequestAsync<T = any>(configureRequest: (twitterRequest: ITwitterRequest) => void): Promise<ITwitterResult<T>> {
    return this._executeRequester.requestAsync<T>(configureRequest);
  }

  public requestAsync<T = any>(configureQuery: (twitterQuery: ITwitterQuery) => void): Promise<ITwitterResult<T>> {
    return this._executeRequester.requestAsync<T>(configureQuery);
  }

  public prepareTwitterRequestAsync(configureRequestOrQuery: (twitterRequest: ITwitterRequest | ITwitterQuery) => void): Promise<ITwitterRequest> {
    return this._executeRequester.prepareTwitterRequestAsync(configureRequestOrQuery);
  }
}

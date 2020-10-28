import {ITwitterResult} from "../../../core/Core/Web/TwitterResult";
import {ITwitterRequest} from "../../../core/Public/Models/Interfaces/ITwitterRequest";
import {ITwitterQuery} from 'src/app/core/Public/Models/Interfaces/ITwitterQuery';
import {IExecuteClient} from "../../../core/Public/Client/Clients/IExecuteClient";
import {IExecuteRequester, IExecuteRequesterToken} from "../../../core/Public/Client/Requesters/IExecuteRequester";
import {Inject, Injectable} from "@angular/core";

@Injectable()
export class ExecuteClient implements IExecuteClient {
  private readonly _executeRequester: IExecuteRequester;

  constructor(@Inject(IExecuteRequesterToken) executeRequester: IExecuteRequester) {
    this._executeRequester = executeRequester;
  }

  public advanceRequestAsync<T>(configureRequest: (twitterRequest: ITwitterRequest) => void): Promise<ITwitterResult<T>> {
    return this._executeRequester.requestAsync<T>(configureRequest);
  }

  public advanceRequestAsync(configureRequest: (twitterRequest: ITwitterRequest) => void): Promise<ITwitterResult> {
    return this._executeRequester.requestAsync(configureRequest);
  }

  public requestAsync<T>(configureQuery: (twitterQuery: ITwitterQuery) => void): Promise<ITwitterResult<T>> {
    return this._executeRequester.requestAsync<T>(configureQuery);
  }

  public requestAsync(configureQuery: (twitterQuery: ITwitterQuery) => void): Promise<ITwitterResult> {
    return this._executeRequester.requestAsync(configureQuery);
  }

  public prepareTwitterRequestAsync(configureQuery: (twitterQuery: ITwitterQuery) => void): Promise<ITwitterRequest> {
    return this._executeRequester.prepareTwitterRequestAsync(configureQuery);
  }

  public prepareTwitterRequestAsync(configureRequest: (twitterRequest: ITwitterRequest) => void): Promise<ITwitterRequest> {
    return this._executeRequester.prepareTwitterRequestAsync(configureRequest);
  }
}

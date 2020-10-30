import {BaseRequester} from "../BaseRequester";
import {IExecuteRequester} from 'src/app/core/Public/Client/Requesters/IExecuteRequester';
import {ITwitterAccessor, ITwitterAccessorToken} from "../../../core/Core/Web/ITwitterAccessor";
import {ITwitterRequest} from "../../../core/Public/Models/Interfaces/ITwitterRequest";
import {ITwitterResult} from "../../../core/Core/Web/TwitterResult";
import {ITwitterQuery} from "../../../core/Public/Models/Interfaces/ITwitterQuery";
import {ITwitterClient, ITwitterClientToken} from "../../../core/Public/ITwitterClient";
import {ITwitterClientEvents, ITwitterClientEventsToken} from "../../../core/Core/Events/TweetinviGlobalEvents";
import {Inject, Injectable} from "@angular/core";

@Injectable()
export class ExecuteRequester extends BaseRequester implements IExecuteRequester {
  private readonly _accessor: ITwitterAccessor;

  constructor(@Inject(ITwitterClientToken) client: ITwitterClient,
              @Inject(ITwitterClientEventsToken) clientEvents: ITwitterClientEvents,
              @Inject(ITwitterAccessorToken) accessor: ITwitterAccessor) {

    super(client, clientEvents);
    this._accessor = accessor;
  }

  public requestAsync<T = any>(configureRequestOrConfigureQuery: (twitterRequestOrQuery: ITwitterRequest | ITwitterQuery) => void): Promise<ITwitterResult<T>> | Promise<ITwitterResult> {
    return super.ExecuteRequestAsync(request => {
      configureRequestOrConfigureQuery(request);
      return this._accessor.executeRequestAsync<T>(request);
    });
  }

  // public RequestAsync<T>(configureRequest: ((twitterRequest: ITwitterRequest) => void) | ((twitterQuery: ITwitterQuery) => void)): Promise<ITwitterResult<T>> {
  //   return super.ExecuteRequestAsync(request => {
  //     configureRequest(request);
  //     return this._accessor.ExecuteRequestAsync<T>(request);
  //   });
  // }

  public requestAsync(configureRequest: (twitterRequest: ITwitterRequest) => void): Promise<ITwitterResult> {
    return super.ExecuteRequestAsync(request => {
      configureRequest(request);
      return this._accessor.executeRequestAsync(request);
    });
  }

  public requestAsync<T>(configureQuery: (twitterQuery: ITwitterQuery) => void): Promise<ITwitterResult<T>> {
    return super.ExecuteRequestAsync(request => {
      configureQuery(request.query);
      return this._accessor.executeRequestAsync<T>(request);
    });
  }

  public requestAsync(configureQuery: (twitterQuery: ITwitterQuery) => void): Promise<ITwitterResult> {
    return super.ExecuteRequestAsync(request => {
      configureQuery(request.query);
      return this._accessor.executeRequestAsync(request);
    });
  }

  public prepareTwitterRequestAsync(configureQuery: (twitterQuery: ITwitterQuery) => void): Promise<ITwitterRequest> {
    return super.ExecuteRequestAsync(async request => {
      configureQuery(request.query);
      await this._accessor.prepareTwitterRequestAsync(request); // .ConfigureAwait(false);
      return request;
    });
  }

  public prepareTwitterRequestAsync(configureRequest: (twitterRequest: ITwitterRequest) => void): Promise<ITwitterRequest> {
    return super.ExecuteRequestAsync(async request => {
      configureRequest(request);
      await this._accessor.prepareTwitterRequestAsync(request); // .ConfigureAwait(false);
      return request;
    });
  }
}

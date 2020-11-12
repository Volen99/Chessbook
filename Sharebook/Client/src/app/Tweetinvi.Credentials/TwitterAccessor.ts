import {Inject, Injectable} from "@angular/core";

import {ITwitterAccessor} from "../core/Core/Web/ITwitterAccessor";
import {ITwitterResult, ITwitterResultFactory, ITwitterResultFactoryToken} from "../core/Core/Web/TwitterResult";
import {ITwitterRequest} from "../core/Public/Models/Interfaces/ITwitterRequest";
import {ITwitterRequestHandler, ITwitterRequestHandlerToken} from "../webLogic/TwitterRequestHandler";

@Injectable({
  providedIn: 'root',
})
export class TwitterAccessor implements ITwitterAccessor {
  private readonly _twitterRequestHandler: ITwitterRequestHandler;
  private readonly _twitterResultFactory: ITwitterResultFactory;

  constructor(@Inject(ITwitterRequestHandlerToken) twitterRequestHandler: ITwitterRequestHandler,
              @Inject(ITwitterResultFactoryToken) twitterResultFactory: ITwitterResultFactory) {
    this._twitterRequestHandler = twitterRequestHandler;
    this._twitterResultFactory = twitterResultFactory;
  }

  public async executeRequestAsync(request: ITwitterRequest): Promise<ITwitterResult> {
    let response = await this._twitterRequestHandler.executeQueryAsync(request);
    return this._twitterResultFactory.create(request, response);
  }

  public async executeRequestGenericAsync<T>(request: ITwitterRequest): Promise<ITwitterResult<T>> {
    let response = await this._twitterRequestHandler.executeQueryAsync(request);
    return this._twitterResultFactory.create<T>(request, response);
  }

  // Sign
  public prepareTwitterRequestAsync(request: ITwitterRequest): Promise<void> {
    return this._twitterRequestHandler.prepareTwitterRequestAsync(request);
  }
}

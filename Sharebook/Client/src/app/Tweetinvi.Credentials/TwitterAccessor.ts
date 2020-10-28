import {ITwitterAccessor} from "../core/Core/Web/ITwitterAccessor";
import {ITwitterResult, ITwitterResultFactory} from "../core/Core/Web/TwitterResult";
import {ITwitterRequest} from "../core/Public/Models/Interfaces/ITwitterRequest";

export class TwitterAccessor implements ITwitterAccessor {
  private readonly _twitterRequestHandler: ITwitterRequestHandler;
  private readonly _twitterResultFactory: ITwitterResultFactory;

  constructor(twitterRequestHandler: ITwitterRequestHandler, twitterResultFactory: ITwitterResultFactory) {
    this._twitterRequestHandler = twitterRequestHandler;
    this._twitterResultFactory = twitterResultFactory;
  }

  public async executeRequestAsync(request: ITwitterRequest): Promise<ITwitterResult> {
    let response = await this._twitterRequestHandler.ExecuteQueryAsync(request).ConfigureAwait(false);
    return this._twitterResultFactory.create(request, response);
  }

  public async executeRequestAsync<T>(request: ITwitterRequest): Promise<ITwitterResult<T>> {
    let response = await this._twitterRequestHandler.ExecuteQueryAsync(request).ConfigureAwait(false);
    return this._twitterResultFactory.create<T>(request, response);
  }

  // Sign
  public prepareTwitterRequestAsync(request: ITwitterRequest): Promise<void> {
    return this._twitterRequestHandler.PrepareTwitterRequestAsync(request);
  }
}

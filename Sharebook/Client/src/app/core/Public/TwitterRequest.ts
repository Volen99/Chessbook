import {ITwitterQuery} from "./Models/Interfaces/ITwitterQuery";
import {TwitterQuery} from "./TwitterQuery";
import {ITwitterRequest} from "./Models/Interfaces/ITwitterRequest";
import {ITwitterExecutionContext, TwitterExecutionContext} from "../Core/Client/TwitterExecutionContext";
import {ITwitterClientHandler} from "../Core/Web/ITwitterClientHandler";
import ArgumentException from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Exceptions/ArgumentException";

export class TwitterRequest implements ITwitterRequest {
  private _query: ITwitterQuery;

  constructor(source?: ITwitterRequest) {
    this.query = new TwitterQuery();
    this.executionContext = new TwitterExecutionContext();
    this.executionContext.requestFactory = () => new TwitterRequest();

    if (source == null) {
      return;
    }

    this.query = new TwitterQuery(undefined, undefined, source.query);
    this.twitterClientHandler = source.twitterClientHandler;
    this.executionContext = new TwitterExecutionContext(source.executionContext);
  }

  public executionContext: ITwitterExecutionContext;
  public twitterClientHandler: ITwitterClientHandler;

  get query(): ITwitterQuery {
    return this._query;
  }

  set query(value: ITwitterQuery) {
    if (value == null) {
      throw new ArgumentException("Cannot set query to null");
    }

    this._query = value;
  }
}

import {ITwitterQuery} from "./ITwitterQuery";
import {ITwitterClientHandler} from "../../../Core/Web/ITwitterClientHandler";
import {ITwitterExecutionContext} from "../../../Core/Client/TwitterExecutionContext";

export interface ITwitterRequest {
  query: ITwitterQuery;
  twitterClientHandler: ITwitterClientHandler;
  executionContext: ITwitterExecutionContext;
}

import {ITwitterQuery} from "../../Public/Models/Interfaces/ITwitterQuery";
import {ITwitterClientHandler} from "../Web/ITwitterClientHandler";
import {HttpClient} from "@aspnet/signalr";

export interface IHttpClientWebHelper {
  getHttpResponseAsync(twitterQuery: ITwitterQuery, handler: ITwitterClientHandler /*= null*/): Promise<HttpResponseMessage>;

  getHttpClient(twitterQuery: ITwitterQuery, handler: ITwitterClientHandler /*= null*/): HttpClient;
}

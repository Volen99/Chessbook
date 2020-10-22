import {ITwitterQuery} from "../../Public/Models/Interfaces/ITwitterQuery";
import {ITwitterClientHandler} from "../Web/ITwitterClientHandler";
import {HttpClient} from "@aspnet/signalr";
import {InjectionToken} from "@angular/core";
import {HttpClientWebHelper} from "../../../webLogic/HttpClientWebHelper";

export interface IHttpClientWebHelper {
  getHttpResponseAsync(twitterQuery: ITwitterQuery, handler: ITwitterClientHandler /*= null*/): Promise<HttpResponseMessage>;

  getHttpClient(twitterQuery: ITwitterQuery, handler: ITwitterClientHandler /*= null*/): HttpClient;
}

export const ITweetIdentifierToken = new InjectionToken<IHttpClientWebHelper>('IHttpClientWebHelper', {
  providedIn: 'root',
  factory: () => new HttpClientWebHelper(),
});

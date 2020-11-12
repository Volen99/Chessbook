import {inject, InjectionToken} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";

import {ITwitterQuery} from "../../Public/Models/Interfaces/ITwitterQuery";
import {ITwitterClientHandler} from "../Web/ITwitterClientHandler";
import {HttpClientWebHelper} from "../../../webLogic/HttpClientWebHelper";
import {OAuthWebRequestGeneratorFactory} from "../../../webLogic/OAuthWebRequestGenerator";
import {Observable} from "rxjs";

export interface IHttpClientWebHelper {
  getHttpResponseAsync(twitterQuery: ITwitterQuery, handler?: ITwitterClientHandler /*= null*/): Promise<Response>;

  getHttpClient(twitterQuery: ITwitterQuery, handler?: ITwitterClientHandler /*= null*/): HttpClient;
}

export const IHttpClientWebHelperToken = new InjectionToken<IHttpClientWebHelper>('IHttpClientWebHelper', {
  providedIn: 'root',
  factory: () => new HttpClientWebHelper(inject(OAuthWebRequestGeneratorFactory), inject(HttpClient)),
});

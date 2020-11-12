import {inject, Inject, InjectionToken} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {ITwitterRequest} from "../../Public/Models/Interfaces/ITwitterRequest";
import {WebHelper} from "../../../webLogic/WebHelper";
import Uri from "typescript-dotnet-commonjs/System/Uri/Uri";
import Dictionary from "typescript-dotnet-commonjs/System/Collections/Dictionaries/Dictionary";

export interface IWebHelper {
  getResponseStreamAsync(request: ITwitterRequest): Promise<any>; // Task<Stream>;

  getUriParameters(uri: Uri): Dictionary<string, string>;

  getURLParameters(url: string): Dictionary<string, string>;

  getQueryParameters(queryUrl: string): Dictionary<string, string>;

  getBaseURL(url: string): string;

  getBaseURL(uri: Uri): string;
}

export const IWebHelperToken = new InjectionToken<IWebHelper>('IWebHelper', {
  providedIn: 'root',
  factory: () => new WebHelper(inject(HttpClient)),
});

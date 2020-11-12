import {HttpClient} from '@angular/common/http';

import {ITwitterRequest} from "../core/Public/Models/Interfaces/ITwitterRequest";
import {IWebHelper} from "../core/Core/Helpers/IWebHelper";
import {UriKind} from "../core/Public/Models/Enum/uri-kind";
import {SharebookConsts} from "../core/Public/sharebook-consts";
import Dictionary from "typescript-dotnet-commonjs/System/Collections/Dictionaries/Dictionary";
import Uri from "typescript-dotnet-commonjs/System/Uri/Uri";
import Type from "typescript-dotnet-commonjs/System/Types";
import Regex from "typescript-dotnet-commonjs/System/Text/RegularExpressions";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class WebHelper implements IWebHelper {
  private _httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this._httpClient = httpClient;
  }

  public getResponseStreamAsync(request: ITwitterRequest): Promise<any> {
    // @ts-ignore
    return this._httpClient.get(request.query.url);
  }

  public getURLParameters(url: string): Dictionary<string, string> {
    return this.getUriParameters(Uri.from(url));
  }

  public getUriParameters(uri: Uri): Dictionary<string, string> {
    return this.getQueryParameters(uri.query);
  }

  public getQueryParameters(queryUrl: string): Dictionary<string, string> {
    let uriParameters = new Dictionary<string, string>();

    if (queryUrl) {
      let regex = new Regex("(?<varName>[^&?=]+)=(?<value>[^&?=]*)"); // escape?
      for (let variable/*: Match*/ of regex.matches(queryUrl)) {
        uriParameters.addByKeyValue(variable.groups[`varName`].value, variable.groups[`value`].value);
      }
    }

    return uriParameters;
  }

  public getBaseURL(urlOrUri: string | Uri): string {
    let uriCurrent: Uri;
    if (Type.isString(urlOrUri) || Type.isNullOrUndefined(urlOrUri)) {
      if (!urlOrUri) {
        return null;
      }

      uriCurrent = Uri.from(urlOrUri);
      if (!uriCurrent) {
        return null;
      }
    } else {
      uriCurrent = urlOrUri;
    }

    if (!uriCurrent.query) {
      return uriCurrent.absoluteUri;
    }

    return uriCurrent.absoluteUri.replace(uriCurrent.query, SharebookConsts.EMPTY);
  }
}

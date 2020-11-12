import {HttpMethod} from "./Models/Enum/HttpMethod";
import {CustomRequestHeaders} from "./Models/Interfaces/CustomRequestHeaders";
import {ITwitterRequestParameters} from "./Models/Interfaces/ITwitterRequestParameters";
import {debounce} from "rxjs/operators";
import {DictionaryExtensions} from "../Core/Extensions/DictionaryExtensions";
import {HttpContent} from "./http-content";

export class TwitterRequestParameters implements ITwitterRequestParameters {
  constructor(source?: ITwitterRequestParameters) {
    if (source == null) {
      return;
    }

    this.url = source.url;
    this.httpMethod = source.httpMethod;
    this.acceptHeaders = source.acceptHeaders;
    this.customHeaders = new CustomRequestHeaders();
    DictionaryExtensions.forEach(source.customHeaders, customHeader => {       // TODO: Might buuug 🐛
      this.customHeaders.add(customHeader.key, customHeader.values, customHeader.behaviour);
    });

    this.authorizationHeader = source.authorizationHeader;
  }

  public url: string;
  public httpMethod: HttpMethod;
  public httpContent: HttpContent;
  public isHttpContentPartOfQueryParams: boolean;
  public acceptHeaders: Array<string>;
  public authorizationHeader: string;
  public customHeaders: CustomRequestHeaders;
}


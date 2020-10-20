import {HttpMethod} from "./Models/Enum/HttpMethod";
import {CustomRequestHeaders} from "./Models/Interfaces/CustomRequestHeaders";
import {ITwitterRequestParameters} from "./Models/Interfaces/ITwitterRequestParameters";

export class TwitterRequestParameters implements ITwitterRequestParameters {
  constructor(source?: ITwitterRequestParameters) {
    if (source == null) {
      return;
    }

    this.url = source.url;
    this.httpMethod = source.httpMethod;
    this.acceptHeaders = source.acceptHeaders;
    this.customHeaders = new CustomRequestHeaders();
    source.customHeaders.ForEach(customHeader => {
      CustomHeaders.Add(customHeader.Key, customHeader.Values, customHeader.Behaviour);
    });

    this.authorizationHeader = source.authorizationHeader;
  }

  public url: string;
  public httpMethod: HttpMethod;
  public httpContent: HttpContent;  // virtual
  public isHttpContentPartOfQueryParams: boolean;
  public acceptHeaders: Array<string>;
  public authorizationHeader: string;
  public customHeaders: CustomRequestHeaders;
}


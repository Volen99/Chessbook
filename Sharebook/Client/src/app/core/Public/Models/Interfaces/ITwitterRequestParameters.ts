import {HttpMethod} from "../Enum/HttpMethod";
import {CustomRequestHeaders} from "./CustomRequestHeaders";
import {HttpContent} from "../../http-content";

// Contains the fields that are required to build an HttpRequest to run the query
export interface ITwitterRequestParameters {
  // Query that will be executed.
  url: string;

  // HTTP Method used to execute the query.
  httpMethod: HttpMethod;

  // Content of the HTTP request.
  httpContent: HttpContent;

  // Whether the HttpContent should be considered as part of the query url
  isHttpContentPartOfQueryParams: boolean;

  // Content Types accepted by the HttpRequest
  acceptHeaders: Array<string>;

  // Authorization header that Twitter uses to validate a twitter HttpRequest
  authorizationHeader: string;

  // Additional headers to add to the HttpRequest
  customHeaders: CustomRequestHeaders;
}

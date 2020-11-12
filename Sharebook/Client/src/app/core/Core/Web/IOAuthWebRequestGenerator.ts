import {HttpMethod} from '../../Public/Models/Enum/HttpMethod';
import {IOAuthQueryParameter} from './IOAuthQueryParameter';
import {IReadOnlyConsumerCredentials} from "../Models/Authentication/ReadOnlyConsumerCredentials";
import {IReadOnlyTwitterCredentials} from "../Models/Authentication/ReadOnlyTwitterCredentials";
import {ITwitterQuery} from "../../Public/Models/Interfaces/ITwitterQuery";
import {IAuthenticationRequest} from "../../Public/Models/Authentication/IAuthenticationRequest";
import Uri from "typescript-dotnet-commonjs/System/Uri/Uri";

// Generator of HttpWebRequest using OAuth specification
export interface IOAuthWebRequestGenerator {
  // Generate an OAuth query parameter
  generateParameter(key: string, value: string, requiredForSignature: boolean, requiredForHeader: boolean, isPartOfOAuthSecretKey: boolean): IOAuthQueryParameter;

  // Generate all the query parameters for an application connection.
  generateApplicationParameters(temporaryCredentials: IReadOnlyConsumerCredentials, authRequest: IAuthenticationRequest,
                                additionalParameters: Array<IOAuthQueryParameter>): Array<IOAuthQueryParameter>;

  // Generate the authentication parameters from Twitter credentials.
  generateParameters(credentials: IReadOnlyTwitterCredentials, additionalParameters: Array<IOAuthQueryParameter>): Array<IOAuthQueryParameter>;

  // Generate authorization headers for a query with the specified OAuth fields.
  generateAuthorizationHeader(uri: Uri, httpMethod: HttpMethod, parameters: Array<IOAuthQueryParameter>): string;

  // Generate authorization headers for a query with the specified OAuth fields.
  setTwitterQueryAuthorizationHeaderAsync(twitterQuery: ITwitterQuery): Promise<string>;

  generateAuthorizationHeaderAsync(uri: Uri, queryContent: any /*HttpContent*/, httpMethod: HttpMethod,
                                   parameters: Array<IOAuthQueryParameter>): Promise<string>;
}

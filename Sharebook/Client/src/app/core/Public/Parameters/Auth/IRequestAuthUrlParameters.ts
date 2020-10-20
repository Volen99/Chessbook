import {ICustomRequestParameters} from "../CustomRequestParameters";
import {AuthAccessType} from './AuthAccessType';

// For more information visit: https://developer.twitter.com/en/docs/basics/authentication/api-reference/request_token
export interface IRequestAuthUrlParameters extends ICustomRequestParameters {
  // The url Twitter will redirect to after attempting to authenticate the user
  // If not specified the user will not be redirected but will obtain a code to use to validate the authentications.
  callbackUrl: string;

  // Forces the user to enter their credentials to ensure the correct users account is authorized.
  forceLogin?: boolean;

  // Prefill the username input box of the Twitter login screen with the given value.
  screenName: string;

  /// <summary>
  /// Overrides the access level an application requests to a users account. Supported values are read or write.
  /// This parameter is intended to allow a developer to register a read/write application but also
  /// request read only access when appropriate.
  /// </summary>
  authAccessType?: AuthAccessType;
}

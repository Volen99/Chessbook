import {InjectionToken} from "@angular/core";

import {ITwitterCredentials} from "../../Public/Models/Authentication/TwitterCredentials";
import {CredentialsAccessor} from "../../../Tweetinvi.Credentials/CredentialsAccessor";

export interface ICredentialsAccessor {
  applicationCredentials: ITwitterCredentials;
  currentThreadCredentials: ITwitterCredentials;

  executeOperationWithCredentials<T>(credentials: ITwitterCredentials, operation: () => T): T;

  executeOperationWithCredentials(credentials: ITwitterCredentials, operation: () => void): void;
}

export const ICredentialsAccessorToken = new InjectionToken<ICredentialsAccessor>('ICredentialsAccessor', {
  providedIn: 'root',
  factory: () => new CredentialsAccessor(),
});

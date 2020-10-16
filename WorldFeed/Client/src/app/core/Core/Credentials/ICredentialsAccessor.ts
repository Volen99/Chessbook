import {ITwitterCredentials} from "../../Public/Models/Authentication/TwitterCredentials";

export interface ICredentialsAccessor {
  applicationCredentials: ITwitterCredentials;
  currentThreadCredentials: ITwitterCredentials;

  executeOperationWithCredentials<T>(credentials: ITwitterCredentials, operation: () => T): T;

  executeOperationWithCredentials(credentials: ITwitterCredentials, operation: () => void): void;
}

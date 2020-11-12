import {ICredentialsAccessor} from "../core/Core/Credentials/ICredentialsAccessor";
import {ITwitterCredentials} from '../core/Public/Models/Authentication/TwitterCredentials';

export class CredentialsAccessor implements ICredentialsAccessor {
  private static staticApplicationCredentials: ITwitterCredentials;

  constructor() {
    this.currentThreadCredentials = CredentialsAccessor.staticApplicationCredentials;
  }

  get applicationCredentials(): ITwitterCredentials {
    return CredentialsAccessor.staticApplicationCredentials;
  }

  set applicationCredentials(value: ITwitterCredentials) {
    CredentialsAccessor.staticApplicationCredentials = value;

    if (CredentialsAccessor._currentThreadCredentials == null) {
      CredentialsAccessor._currentThreadCredentials = value;
    }
  }

  // [ThreadStatic]; // Ensures that the thread initialization is performed only once!
  private static _currentThreadCredentialsInitialized: boolean; // bool?

  // [ThreadStatic];
  private static _currentThreadCredentials: ITwitterCredentials;


  get currentThreadCredentials(): ITwitterCredentials {
    if (CredentialsAccessor._currentThreadCredentialsInitialized == null) {
      CredentialsAccessor._currentThreadCredentials = this.applicationCredentials;
      CredentialsAccessor._currentThreadCredentialsInitialized = true;
    }

    return CredentialsAccessor._currentThreadCredentials;
  }

  set currentThreadCredentials(value: ITwitterCredentials) {
    CredentialsAccessor._currentThreadCredentials = value;

    // Mark as initialised, don't want to override these credentials the user has set with application ones when we first use them
    CredentialsAccessor._currentThreadCredentialsInitialized = true;

    if (!this.hasTheApplicationCredentialsBeenInitialized() && CredentialsAccessor._currentThreadCredentials != null) {
      CredentialsAccessor.staticApplicationCredentials = value;
    }
  }

  public executeOperationWithCredentials<T>(credentials: ITwitterCredentials, operation: () => T | void): T | void {
    // This operation does not need any lock because the Credentials are unique per thread
    // We can therefore change the value safely without affecting any other thread

    let initialCredentials = this.currentThreadCredentials;
    this.currentThreadCredentials = credentials;
    let result = operation();

    let hasUserChangedCredentialsDuringOpertion: boolean = this.currentThreadCredentials !== credentials;
    if (!hasUserChangedCredentialsDuringOpertion) {
      this.currentThreadCredentials = initialCredentials;
    }

    if (result) {
      return result;
    }
  }

  private hasTheApplicationCredentialsBeenInitialized(): boolean {
    return CredentialsAccessor.staticApplicationCredentials != null;
  }
}

import {IRateLimitCache} from "../../core/Core/RateLimit/IRateLimitCache";
import {ICredentialsRateLimits} from "../../core/Public/Models/RateLimits/ICredentialsRateLimits";
import {IReadOnlyTwitterCredentials} from "../../core/Core/Models/Authentication/ReadOnlyTwitterCredentials";
import Dictionary from "typescript-dotnet-commonjs/System/Collections/Dictionaries/Dictionary";
import {DictionaryExtensions} from "../../core/Core/Extensions/DictionaryExtensions";
import {Injectable} from "@angular/core";

// IMPORTANT: This class needs to be ThreadSafe because it is registered as InstancePerApplication
// We want the cache to be updated once the second thread has completed the operation
@Injectable({
  providedIn: 'root',
})
export class RateLimitCache implements IRateLimitCache {
  private readonly _credentialsRateLimits: Dictionary<IReadOnlyTwitterCredentials, ICredentialsRateLimits>;

  private readonly _lockRefresh: object = {};
  private readonly _lockCredentialsRateLimitsDictionary: object = {};

  constructor() {
    this._credentialsRateLimits = new Dictionary<IReadOnlyTwitterCredentials, ICredentialsRateLimits>();
  }

  public clearAsync(credentials: IReadOnlyTwitterCredentials): Promise<void> {
    // We want to lock both the refresh dictionary access so that we ensure the dictionary
    // is not cleared during a refresh or when it is being accessed
    // lock(this._lockRefresh);
    // lock(this._lockCredentialsRateLimitsDictionary);
    if (this._credentialsRateLimits.containsKey(credentials)) {
      this._credentialsRateLimits.removeByKey(credentials);
    }

    return Promise.resolve(); // Task.CompletedTask
  }

  public clearAllAsync(): Promise<void> {
    // We want to lock both the refresh dictionary access so that we ensure the dictionary
    // is not cleared during a refresh or when it is being accessed
    // lock(this._lockRefresh);
    // lock(this._lockCredentialsRateLimitsDictionary);
    this._credentialsRateLimits.clear();

    return Promise.resolve(); // Task.CompletedTask;
  }

  public getCredentialsRateLimitsAsync(credentials: IReadOnlyTwitterCredentials): Promise<ICredentialsRateLimits> {
    // lock(this._lockCredentialsRateLimitsDictionary);
    let credentialsRateLimits: ICredentialsRateLimits;
    let out = (value: ICredentialsRateLimits): void => {
      credentialsRateLimits = value;
    };
    if (credentials != null && this._credentialsRateLimits.tryGetValue(credentials, out)) {
      return Promise.resolve(credentialsRateLimits); // Task.FromResult(credentialsRateLimits);
    }

    return Promise.resolve<ICredentialsRateLimits>(null); // Task.FromResult<ICredentialsRateLimits>(null);
  }

  public refreshEntryAsync(credentials: IReadOnlyTwitterCredentials, newCredentialsRateLimits: ICredentialsRateLimits): Promise<void> {
    // lock(this._lockCredentialsRateLimitsDictionary);
    if (newCredentialsRateLimits == null) {
      return Promise.resolve(); // Task.CompletedTask;
    }

    let currentRateLimits: ICredentialsRateLimits;
    let out1 = (value: ICredentialsRateLimits): void => {
      currentRateLimits = value;
    };
    if (this._credentialsRateLimits.tryGetValue(credentials, out1)) {
      let existingCustomEndpoints = currentRateLimits.otherEndpointRateLimits;
      existingCustomEndpoints.forEach(x => DictionaryExtensions.addOrUpdate(newCredentialsRateLimits.otherEndpointRateLimits, x.key, x.value));
    }

    DictionaryExtensions.addOrUpdate(this._credentialsRateLimits, credentials, newCredentialsRateLimits);

    return Promise.resolve(); // Task.CompletedTask;
  }
}

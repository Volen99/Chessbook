import {ITwitterExecutionContext} from "../../../Core/Client/TwitterExecutionContext";
import {RateLimitsSource} from "../HelpClient/GetRateLimitsParameters";
import {IReadOnlyTwitterCredentials} from "../../../Core/Models/Authentication/ReadOnlyTwitterCredentials";

export interface IWaitForCredentialsRateLimitParameters {
  url: string;
  credentials: IReadOnlyTwitterCredentials;
  executionContext: ITwitterExecutionContext;
  from: RateLimitsSource;
}

export class WaitForCredentialsRateLimitParameters implements IWaitForCredentialsRateLimitParameters {
  constructor(url: string) {
    this.url = url;
  }

  public url: string;
  public credentials: IReadOnlyTwitterCredentials;
  public executionContext: ITwitterExecutionContext;
  public from: RateLimitsSource;
}

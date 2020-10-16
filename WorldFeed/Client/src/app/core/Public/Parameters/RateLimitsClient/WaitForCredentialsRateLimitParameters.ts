import {ITwitterExecutionContext} from "../../../Core/Client/TwitterExecutionContext";
import {RateLimitsSource} from "../HelpClient/GetRateLimitsParameters";
import {IReadOnlyTwitterCredentials} from "../../../Core/Models/Authentication/ReadOnlyTwitterCredentials";

export interface IWaitForCredentialsRateLimitParameters {
  Url: string;
  Credentials: IReadOnlyTwitterCredentials;
  ExecutionContext: ITwitterExecutionContext;
  From: RateLimitsSource;
}

export class WaitForCredentialsRateLimitParameters implements IWaitForCredentialsRateLimitParameters {
  constructor(url: string) {
    this.Url = url;
  }

  public Url: string;
  public Credentials: IReadOnlyTwitterCredentials;
  public ExecutionContext: ITwitterExecutionContext;
  public From: RateLimitsSource;
}

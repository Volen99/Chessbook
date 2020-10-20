import {EventArgs} from "../../../c#-objects/TypeScript.NET-Core/packages/Events/source/EventArgs";
import {IEndpointRateLimit} from '../Models/RateLimits/IEndpointRateLimit';
import {IReadOnlyTwitterCredentials} from '../../Core/Models/Authentication/ReadOnlyTwitterCredentials';

export class QueryAwaitingEventArgs extends EventArgs {
  private readonly _query: string;
  private readonly _queryRateLimit: IEndpointRateLimit;
  private readonly _twitterCredentials: IReadOnlyTwitterCredentials;

  constructor(query: string, queryRateLimit: IEndpointRateLimit, twitterCredentials: IReadOnlyTwitterCredentials) {
    super();
    this._query = query;
    this._queryRateLimit = queryRateLimit;
    this._twitterCredentials = twitterCredentials;
  }

  get Query(): string {
    return this._query;
  }

  get QueryRateLimit(): IEndpointRateLimit {
    return this._queryRateLimit;
  }

  get Credentials(): IReadOnlyTwitterCredentials {
    return this._twitterCredentials;
  }

  get ResetDateTime(): DateTimeOffset {
    return this._queryRateLimit.resetDateTime;
  }

  get ResetInMilliseconds(): number {
    return this._queryRateLimit.resetDateTimeInMilliseconds as number;
  }
}

import {IEndpointRateLimit} from '../Models/RateLimits/IEndpointRateLimit';
import {IReadOnlyTwitterCredentials} from '../../Core/Models/Authentication/ReadOnlyTwitterCredentials';
import { DateTime } from 'typescript-dotnet-commonjs/System/Time/DateTime';

export class QueryAwaitingEventArgs /*extends EventArgs */ {
  private readonly _query: string;
  private readonly _queryRateLimit: IEndpointRateLimit;
  private readonly _twitterCredentials: IReadOnlyTwitterCredentials;

  constructor(query: string, queryRateLimit: IEndpointRateLimit, twitterCredentials: IReadOnlyTwitterCredentials) {
    // super();

    this._query = query;
    this._queryRateLimit = queryRateLimit;
    this._twitterCredentials = twitterCredentials;
  }

  get query(): string {
    return this._query;
  }

  get queryRateLimit(): IEndpointRateLimit {
    return this._queryRateLimit;
  }

  get credentials(): IReadOnlyTwitterCredentials {
    return this._twitterCredentials;
  }

  get resetDateTime(): DateTime /*DateTimeOffset*/ {
    return this._queryRateLimit.resetDateTime;
  }

  get resetInMilliseconds(): number {
    return this._queryRateLimit.resetDateTimeInMilliseconds as number;
  }
}

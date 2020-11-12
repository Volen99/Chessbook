import {ITwitterQuery} from "../Models/Interfaces/ITwitterQuery";
import {ITwitterCredentials} from '../Models/Authentication/TwitterCredentials';
import {IEndpointRateLimit} from '../Models/RateLimits/IEndpointRateLimit';
import DateTime from "typescript-dotnet-commonjs/System/Time/DateTime";
import TimeSpan from "typescript-dotnet-commonjs/System/Time/TimeSpan";

export class QueryExecutionEventArgs /*extends EventArgs*/ {
  constructor(twitterQuery: ITwitterQuery) {
    // super();

    this.twitterQuery = twitterQuery;
  }

  // Contains all the required information to execute a request on the Twitter REST API.
  public twitterQuery: ITwitterQuery;

  // Endpoint URL.
  get url(): string {
    return this.twitterQuery.url;
  }

  // Credentials used to execute the query.
  get credentials(): ITwitterCredentials {
    return this.twitterQuery.twitterCredentials;
  }

  // Endpoint Rate Limits information.
  get queryRateLimit(): IEndpointRateLimit {
    return this.twitterQuery.queryRateLimit;
  }

  // Date at which the Twitter query will be ready to be executed.
  get dateOfQueryExecution(): DateTime /*?*/ {
    return this.twitterQuery.dateWhenCredentialsWillHaveTheRequiredRateLimits;
  }

  // Recommended time to wait before executing such a query, in order to ensure that the twitter
  // limitations won't be retuning an error.
  get timeToWaitBeforeExecutingTheQuery(): TimeSpan/*?*/ {
    return this.twitterQuery.timeToWaitBeforeExecutingTheQuery;
  }
}


// public QueryExecutionEventArgs(ITwitterQuery twitterQuery)
// {
//     TwitterQuery = twitterQuery;
// }

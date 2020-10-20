import {EventArgs} from "../../../c#-objects/TypeScript.NET-Core/packages/Events/source/EventArgs";
import {ITwitterQuery} from "../Models/Interfaces/ITwitterQuery";
import {ITwitterCredentials} from '../Models/Authentication/TwitterCredentials';
import {IEndpointRateLimit} from '../Models/RateLimits/IEndpointRateLimit';
import DateTime from 'src/app/c#-objects/TypeScript.NET-Core/packages/Core/source/Time/DateTime';
import TimeSpan from 'src/app/c#-objects/TypeScript.NET-Core/packages/Core/source/Time/TimeSpan';

export class QueryExecutionEventArgs extends EventArgs {
  constructor(twitterQuery: ITwitterQuery) {
    super();
    this.TwitterQuery = twitterQuery;
  }

  // Contains all the required information to execute a request on the Twitter REST API.
  public TwitterQuery: ITwitterQuery;

  // Endpoint URL.
  get Url(): string {
    return this.TwitterQuery.url;
  }

  // Credentials used to execute the query.
  get Credentials(): ITwitterCredentials {
    return this.TwitterQuery.twitterCredentials;
  }

  // Endpoint Rate Limits information.
  get QueryRateLimit(): IEndpointRateLimit {
    return this.TwitterQuery.queryRateLimit;
  }

  // Date at which the Twitter query will be ready to be executed.
  get DateOfQueryExecution(): DateTime/*?*/ {
    return this.TwitterQuery.dateWhenCredentialsWillHaveTheRequiredRateLimits;
  }

  // Recommended time to wait before executing such a query, in order to ensure that the twitter
  // limitations won't be retuning an error.
  get TimeToWaitBeforeExecutingTheQuery(): TimeSpan/*?*/ {
    return this.TwitterQuery.timeToWaitBeforeExecutingTheQuery;
  }
}


// public QueryExecutionEventArgs(ITwitterQuery twitterQuery)
// {
//     TwitterQuery = twitterQuery;
// }

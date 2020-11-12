import {QueryExecutionEventArgs} from "./QueryExecutionEventArgs";
import {ITwitterQuery} from "../Models/Interfaces/ITwitterQuery";
import DateTime from 'typescript-dotnet-commonjs/System/Time/DateTime';

// Event raised to inform that a request is starting its execution
export class BeforeExecutingRequestEventArgs extends QueryExecutionEventArgs {
  constructor(twitterQuery: ITwitterQuery) {
    super(twitterQuery);
    this.beforeExecutingDateTime = DateTime.now;
  }

  public beforeExecutingDateTime: DateTime;

  // If set to true this query won't be executed.
  public cancel: boolean;
}

import {QueryExecutionEventArgs} from "./QueryExecutionEventArgs";
import {ITwitterQuery} from "../Models/Interfaces/ITwitterQuery";
import DateTime from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Time/DateTime";

// Event raised to inform that a request is starting its execution
export class BeforeExecutingRequestEventArgs extends QueryExecutionEventArgs {
  constructor(twitterQuery: ITwitterQuery) {
    super(twitterQuery);
    this.BeforeExecutingDateTime = DateTime.now;
  }

  public BeforeExecutingDateTime: DateTime;

  // If set to true this query won't be executed.
  public Cancel: boolean;
}

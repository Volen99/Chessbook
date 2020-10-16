import {AfterExecutingQueryEventArgs} from "./AfterExecutingQueryEventArgs";
import {ITwitterQuery} from "../Models/Interfaces/ITwitterQuery";
import {TwitterException} from "../Exceptions/TwitterException";

// Event raised to inform that a request just failed its execution
export class AfterExecutingQueryExceptionEventArgs extends AfterExecutingQueryEventArgs {
  constructor(twitterQuery: ITwitterQuery, exception: TwitterException) {
    super(twitterQuery, null, null);

    super.Exception = exception;
  }
}

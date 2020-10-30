import {AfterExecutingQueryEventArgs} from "./AfterExecutingQueryEventArgs";
import {ITwitterQuery} from "../Models/Interfaces/ITwitterQuery";
import {SharebookException} from "../Exceptions/SharebookException";

// Event raised to inform that a request just failed its execution
export class AfterExecutingQueryExceptionEventArgs extends AfterExecutingQueryEventArgs {
  constructor(twitterQuery: ITwitterQuery, exception: SharebookException) {
    super(twitterQuery, null, null);

    super.Exception = exception;
  }
}

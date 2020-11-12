import {ITwitterQuery} from "../Models/Interfaces/ITwitterQuery";
import {SharebookException} from "../Exceptions/SharebookException";
import {QueryExecutionEventArgs} from "./QueryExecutionEventArgs";
import IEnumerable from "typescript-dotnet-commonjs/System/Collections/Enumeration/IEnumerable";
import Dictionary from "typescript-dotnet-commonjs/System/Collections/Dictionaries/Dictionary";
import DateTime from "typescript-dotnet-commonjs/System/Time/DateTime";

// Event raised to inform that a request completed its execution
export class AfterExecutingQueryEventArgs extends QueryExecutionEventArgs {
  constructor(twitterQuery: ITwitterQuery, httpContent: string, httpHeaders: Dictionary<string, IEnumerable<string>>) {
    super(twitterQuery);

    this.httpContent = httpContent;
    this.httpHeaders = httpHeaders;
    this.completedDateTime = DateTime.now;
  }

  // Result returned by Twitter.
  public httpContent: string;

  // Headers returned by Twitter.
  public httpHeaders: Dictionary<string, IEnumerable<string>>;

  // Exact DateTime when the request completed.
  public completedDateTime: DateTime; // DateTimeOffset;

  // Whether the request has been successful.
  get success(): boolean {
    return this.httpContent != null;
  }

  // Exception Raised by Twitter
  public exception: SharebookException;
}

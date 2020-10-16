import {ITwitterQuery} from "../Models/Interfaces/ITwitterQuery";
import Dictionary from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Dictionaries/Dictionary";
import IEnumerable from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Enumeration/IEnumerable";
import DateTime from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Time/DateTime";
import {TwitterException} from "../Exceptions/TwitterException";
import {QueryExecutionEventArgs} from "./QueryExecutionEventArgs";

// Event raised to inform that a request completed its execution
export class AfterExecutingQueryEventArgs extends QueryExecutionEventArgs {
  constructor(twitterQuery: ITwitterQuery, httpContent: string, httpHeaders: Dictionary<string, IEnumerable<string>>) {
    super(twitterQuery);

    this.HttpContent = httpContent;
    this.HttpHeaders = httpHeaders;
    this.CompletedDateTime = DateTime.now;
  }

  // Result returned by Twitter.
  public HttpContent: string;

  // Headers returned by Twitter.
  public HttpHeaders: Dictionary<string, IEnumerable<string>>;

  // Exact DateTime when the request completed.
  public CompletedDateTime: DateTimeOffset;

  // Whether the request has been successful.
  get Success(): boolean {
    return this.HttpContent != null;
  }

  // Exception Raised by Twitter
  public Exception: TwitterException;
}

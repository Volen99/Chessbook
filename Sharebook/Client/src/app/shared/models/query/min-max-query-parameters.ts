import {CustomRequestParameters, ICustomRequestParameters} from "./custom-request-parameters";

export enum ContinueMinMaxCursor {
  // The iterator will be marked as completed when no more items are returned.
  // This implies additional requests.
  UntilNoItemsReturned,

  // The iterator will be marked as completed when the number of items returned is lower than requested.
  UntilPageSizeIsDifferentFromRequested,
}

export interface IMinMaxQueryParameters extends ICustomRequestParameters {
  // The maximum number of objects to return
  pageSize: number;

  // Minimum id that can be returned by the query (start from)
  sinceId?: number; // long?

  // Maximum id that can be returned by the query (ends at)
  maxId?: number; // long?

  // Defines when the cursor should stop
  continueMinMaxCursor: ContinueMinMaxCursor;
}

export class MinMaxQueryParameters extends CustomRequestParameters implements IMinMaxQueryParameters {
  protected constructor(source?: IMinMaxQueryParameters) {
    if (source) {
      super(source);

      this.pageSize = source.pageSize;
      this.sinceId = source.sinceId;
      this.maxId = source.maxId;
      this.continueMinMaxCursor = source.continueMinMaxCursor;
    } else {
      super();
    }
  }

  public pageSize: number;
  public sinceId?: number;
  public maxId?: number;
  public continueMinMaxCursor: ContinueMinMaxCursor;
}

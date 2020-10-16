import {CustomRequestParameters, ICustomRequestParameters} from "./CustomRequestParameters";

export enum ContinueMinMaxCursor {
  // The iterator will be marked as completed when no more items are returned.
  // This implies additional requests.
  UntilNoItemsReturned,

  // The iterator will be marked as completed when the number of items returned is lower than requested.
  UntilPageSizeIsDifferentFromRequested,
}

export interface IMinMaxQueryParameters extends ICustomRequestParameters {
  // The maximum number of objects to return
  PageSize: number;

  // Minimum id that can be returned by the query (start from)
  SinceId?: number; // long?

  // Maximum id that can be returned by the query (ends at)
  MaxId?: number; // long?

  // Defines when the cursor should stop
  ContinueMinMaxCursor: ContinueMinMaxCursor;
}

export class MinMaxQueryParameters extends CustomRequestParameters implements IMinMaxQueryParameters {
  protected constructor(source?: IMinMaxQueryParameters) {
    if (source) {
      super(source);

      this.PageSize = source.PageSize;
      this.SinceId = source.SinceId;
      this.MaxId = source.MaxId;
      this.ContinueMinMaxCursor = source.ContinueMinMaxCursor;
    } else {
      super();
    }
  }

  public PageSize: number;
  public SinceId?: number;
  public MaxId?: number;
  public ContinueMinMaxCursor: ContinueMinMaxCursor;
}


// protected MinMaxQueryParameters()
// {
// }
//
// protected MinMaxQueryParameters(IMinMaxQueryParameters source) : base(source)
// {
//   if (source == null)
//   {
//     return;
//   }
//
//   PageSize = source.PageSize;
//   SinceId = source.SinceId;
//   MaxId = source.MaxId;
//   ContinueMinMaxCursor = source.ContinueMinMaxCursor;
// }

import {IPageResult, PageResult} from "./PageResult";

export interface ICursorPageResult<TItem, TCursor> extends IPageResult<TItem> {
  // Cursor to get the next set of items
  nextCursor: TCursor;
}

// Output of a cursor based requests
export class CursorPageResult<TItem, TCursor> extends PageResult<TItem> implements ICursorPageResult<TItem, TCursor> {
  // Cursor to get the next set of items
  public nextCursor: TCursor;
}

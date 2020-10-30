// An iterator page containing the values of a specific page.
// It also give access to the next page as well as informing if a next page exists.
export interface ITwitterIteratorPage</*out*/ TItem, /*out*/ TCursor> extends Iterable<TItem> {
  nextCursor: TCursor;
  isLastPage: boolean;
}

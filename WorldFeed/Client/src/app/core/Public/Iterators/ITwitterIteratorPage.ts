import IEnumerable from 'src/app/c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Enumeration/IEnumerable';

// An iterator page containing the values of a specific page.
// It also give access to the next page as well as informing if a next page exists.
export interface ITwitterIteratorPage</*out*/ TItem, /*out*/ TCursor> extends IEnumerable<TItem> {
  nextCursor: TCursor;
  isLastPage: boolean;
}

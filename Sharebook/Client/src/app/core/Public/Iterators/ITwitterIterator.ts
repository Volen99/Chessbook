import {ITwitterIteratorPage} from "./ITwitterIteratorPage";

// Iterator allowing you to navigate through Twitter API pages
export interface ITwitterIterator<TItem, TCursor = any> {
  nextCursor: TCursor;
  completed: boolean;

  nextPageAsync(): Promise<ITwitterIteratorPage<TItem, TCursor>>;
}


// export interface ITwitterIterator<TItem> extends ITwitterIterator<TItem, string> {
// }

// export interface ITwitterIterator<TItem, TCursor> {
//   NextCursor: TCursor;
//   Completed: boolean;
//
//   NextPageAsync(): Promise<ITwitterIteratorPage<TItem, TCursor>>;
// }

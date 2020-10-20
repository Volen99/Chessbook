import {IMultiLevelCursorIteratorPage} from "./IMultiLevelCursorIteratorPage";

// Allow developers to iterate over multiple endpoints transparently.
export interface IMultiLevelCursorIterator<TParent, TItem, TCursor = any> {
  completed: boolean;

  nextPageAsync(): Promise<IMultiLevelCursorIteratorPage<TParent, TItem, TCursor>>;
}


// export interface IMultiLevelCursorIterator<TParent, TItem> extends IMultiLevelCursorIterator<TParent, TItem, string> {
// }

// export interface IMultiLevelCursorIterator<TParent, TItem, TCursor> {
//   Completed: boolean;
//
//   NextPageAsync(): Task<IMultiLevelCursorIteratorPage<TParent, TItem, TCursor>>
// }

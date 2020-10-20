import {ICursorPageResult} from "../../Core/Iterators/Models/CursorPageResult";

// Iterator page containing results from multiple endpoints when using MultiLevelCursorIterator
export interface IMultiLevelCursorIteratorPage<TParent, TItem, TCursor> extends ICursorPageResult<TItem, TCursor> {
  // Parent items that were transformed into the items
  associatedParentItems: TParent[];
}

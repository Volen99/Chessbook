import {CursorPageResult} from "./CursorPageResult";
import {IMultiLevelCursorIteratorPage} from "../../../Public/Iterators/IMultiLevelCursorIteratorPage";

export class MultiLevelCursorIteratorPage<TParent, TItem, TCursor> extends CursorPageResult<TItem, TCursor> implements IMultiLevelCursorIteratorPage<TParent, TItem, TCursor> {
  public associatedParentItems: TParent[];
}

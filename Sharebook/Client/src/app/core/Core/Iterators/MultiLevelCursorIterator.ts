import {ICursorPageResult} from "./Models/CursorPageResult";
import {IPageProcessingResult} from "./Models/MultiLevelPageProcessingResult";
import HashSet from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/HashSet";
import {TwitterIteratorAlreadyCompletedException} from "../../Public/Exceptions/TwitterIteratorAlreadyCompletedException";
import {IMultiLevelCursorIteratorPage} from "../../Public/Iterators/IMultiLevelCursorIteratorPage";
import {MultiLevelCursorIteratorPage} from "./Models/MultiLevelCursorIteratorPage";
import {IMultiLevelCursorIterator} from "../../Public/Iterators/IMultiLevelCursorIterator";

// TODO: check C# code!!!!
export class MultiLevelCursorIteratorBase<TParent, TItem, TCursor> implements IMultiLevelCursorIterator<TParent, TItem, TCursor> {
  private readonly _iterateSubLevel: () => Promise<ICursorPageResult<TParent, TCursor>>;
  private readonly _getChildItemsPageFromParent: (parents: TParent[]) => Promise<IPageProcessingResult<TParent, TItem>>;

  private _itemsLeftToProcess: HashSet<TParent>;
  private _lastParentPageResult: ICursorPageResult<TParent, TCursor>;

  constructor(iterateSubLevel: () => Promise<ICursorPageResult<TParent, TCursor>>,
              getChildItemsPageFromParent: (TParent: TParent[]) => Promise<IPageProcessingResult<TParent, TItem>>) {
    this._iterateSubLevel = iterateSubLevel;
    this._getChildItemsPageFromParent = getChildItemsPageFromParent;
    this._itemsLeftToProcess = new HashSet<TParent>();
  }

  get completed(): boolean {
    return this._lastParentPageResult != null && this._lastParentPageResult.isLastPage && this._itemsLeftToProcess.count === 0;
  }

  public async nextPageAsync(): Promise<IMultiLevelCursorIteratorPage<TParent, TItem, TCursor>> {
    if (this.completed) {
      throw new TwitterIteratorAlreadyCompletedException();
    }

    if (this._lastParentPageResult == null || this._itemsLeftToProcess.count === 0) {
      this._lastParentPageResult = await this._iterateSubLevel(); // .ConfigureAwait(false);
      this._itemsLeftToProcess = new HashSet<TParent>(this._lastParentPageResult.items);
    }

    let childItemsPage = await this._getChildItemsPageFromParent(this._itemsLeftToProcess.toArray()); // .ConfigureAwait(false);
    let processedParentItems = childItemsPage.associatedParentItems;
    processedParentItems.forEach(item => { this._itemsLeftToProcess.remove(item); }); // TODO: might bug

    let pageResult = new MultiLevelCursorIteratorPage<TParent, TItem, TCursor>();
    pageResult.items = childItemsPage.items;
    pageResult.associatedParentItems = processedParentItems;
    pageResult.nextCursor = this._lastParentPageResult.nextCursor;
    pageResult.isLastPage = this.completed;

    return pageResult;
  }
}

export class MultiLevelCursorIterator<TParent, TItem> extends MultiLevelCursorIteratorBase<TParent, TItem, string> implements IMultiLevelCursorIterator<TParent, TItem> {
  constructor(iterateSubLevel: () => Promise<ICursorPageResult<TParent, string>>,
              getChildItemsPageFromParent: (tParent: TParent[]) => Promise<IPageProcessingResult<TParent, TItem>>) {
    super(iterateSubLevel, getChildItemsPageFromParent);
  }
}


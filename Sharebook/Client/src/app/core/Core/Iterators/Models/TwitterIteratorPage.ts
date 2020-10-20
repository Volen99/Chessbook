import {ITwitterIteratorPage} from "../../../Public/Iterators/ITwitterIteratorPage";
import IEnumerator from 'src/app/c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Enumeration/IEnumerator';

export class TwitterIteratorPage<TItemCollection extends Array<TItem>, TItem, TCursor> implements ITwitterIteratorPage<TItem, TCursor> { // where TItemCollection: IEnumerable<TItem>
  private readonly _items: TItemCollection;

  constructor(items: TItemCollection, nextCursor: TCursor, isLastPage: boolean) {
    this._items = items;

    this.nextCursor = nextCursor;
    this.isLastPage = isLastPage;
  }

  isEndless?: boolean;


  public nextCursor: TCursor;
  public isLastPage: boolean;

  getEnumerator(): IEnumerator<TItem> {
    return (this._items as (Array<TItem>)).getEnumerator();
  }
}

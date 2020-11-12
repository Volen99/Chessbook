import {ITwitterIteratorPage} from "../../../Public/Iterators/ITwitterIteratorPage";

export class TwitterIteratorPage<TItemCollection extends Iterable<TItem>, TItem, TCursor> implements ITwitterIteratorPage<TItem, TCursor> { // where TItemCollection: IEnumerable<TItem>
  private readonly _items: TItemCollection;

  constructor(items: TItemCollection, nextCursor: TCursor, isLastPage: boolean) {
    this._items = items;

    this.nextCursor = nextCursor;
    this.isLastPage = isLastPage;
  }

  isEndless?: boolean;


  public nextCursor: TCursor;
  public isLastPage: boolean;

  [Symbol.iterator](): Iterator<TItem> {
    return undefined;
  }

  // getEnumerator(): IEnumerator<TItem> {
  //   return (this._items as (Array<TItem>)).getEnumerator();
  // }
}

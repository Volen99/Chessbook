import IEnumerable from "typescript-dotnet-commonjs/System/Collections/Enumeration/IEnumerable";
import IEnumerator from "typescript-dotnet-commonjs/System/Collections/Enumeration/IEnumerator";

export interface IPageResult<TItem> extends IEnumerable<TItem> {
  // Items returned during for a specific cursor iteration
  items: TItem[];

  // Whether all the data have been returned
  isLastPage: boolean;
}

export class PageResult<TItem> implements IPageResult<TItem> {
  constructor() {
    this.items = new Array<TItem>(0); // new TItem[0];
  }

  public isEndless?: boolean;

  public items: TItem[];
  public isLastPage: boolean;

  getEnumerator(): IEnumerator<TItem> {
    let items = this.items ?? new Array<TItem>(0); // new TItem[0];

    return (items as unknown as IEnumerable<TItem>).getEnumerator();
  }
}

import IEnumerator from 'src/app/c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Enumeration/IEnumerator';

export interface IPageResult<TItem> extends Array<TItem> {
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
    let items = this.items ?? new Array<TItem>(0); //  new TItem[0];
    return (items as unknown as (Array<TItem>)).getEnumerator();
  }
}

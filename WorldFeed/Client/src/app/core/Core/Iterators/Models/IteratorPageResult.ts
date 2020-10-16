export interface IIteratorPageResult</*out*/ TPageContent, /*out*/ TCursor> {
  content: TPageContent;
  nextCursor: TCursor;
  isLastPage: boolean;
}

export class IteratorPageResult<TPageContent, TCursor> implements IIteratorPageResult<TPageContent, TCursor> {
  constructor(content: TPageContent, nextCursor: TCursor, isLastPage: boolean) {
    this.content = content;
    this.nextCursor = nextCursor;
    this.isLastPage = isLastPage;
  }

  public content: TPageContent;
  public nextCursor: TCursor;
  public isLastPage: boolean;
}

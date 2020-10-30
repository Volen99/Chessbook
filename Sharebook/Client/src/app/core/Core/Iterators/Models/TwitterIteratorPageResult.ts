import {IIteratorPageResult, IteratorPageResult} from './IteratorPageResult';
import {ITwitterResult} from "../../Web/TwitterResult";

export interface ITwitterIteratorPageResult</*out*/ TPageContent, /*out*/ TCursor> extends IIteratorPageResult<TPageContent, TCursor> {
  rawResult: string;
}

export class TwitterIteratorPageResult<TPageContent extends ITwitterResult, TCursor> extends IteratorPageResult<TPageContent, TCursor> implements ITwitterIteratorPageResult<TPageContent, TCursor> {
  constructor(content: TPageContent, nextCursor: TCursor, isLastPage: boolean) {
    super(content, nextCursor, isLastPage);

    this.rawResult = content.content;
  }

  public rawResult: string;
}

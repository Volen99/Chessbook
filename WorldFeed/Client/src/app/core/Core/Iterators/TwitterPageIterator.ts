import {ITwitterIteratorPageResult, TwitterIteratorPageResult} from "./Models/TwitterIteratorPageResult";
import {TwitterIteratorAlreadyCompletedException} from "../../Public/Exceptions/TwitterIteratorAlreadyCompletedException";
import {ITwitterResult} from "../Web/TwitterResult";

export interface ITwitterPageIterator<TPage, TCursor = any> {
  nextCursor: TCursor;
  completed: boolean;

  nextPageAsync(): Promise<ITwitterIteratorPageResult<TPage, TCursor>>;
}

// export interface ITwitterPageIterator<TPage> extends ITwitterPageIterator<TPage, string> {
// }

// export class TwitterPageIterator<TPage> extends TwitterPageIterator<TPage, string> implements ITwitterPageIterator<TPage> {
//   constructor(
//     initialCursor: string,
//     getNextPage: Func<string, Task<TPage>>,
//     extractNextCursor: Func<TPage, string>,
//     isCompleted: Func<TPage, boolean>) {
//     super(initialCursor, getNextPage, extractNextCursor, isCompleted);
//   }
// }

export class TwitterPageIterator<TPage extends ITwitterResult, TCursor = any> implements ITwitterPageIterator<TPage, TCursor> {
  private readonly _getNextPage: (tCursor: TCursor) => Promise<TPage>;
  private readonly _extractNextCursor: (tPage: TPage) => TCursor;
  private readonly _isCompleted: (tPage: TPage) => boolean;

  constructor(
    initialCursor: TCursor,
    getNextPage: (tCursor: TCursor) => Promise<TPage>,
    extractNextCursor: (tPage: TPage) => TCursor,
    isCompleted: (tPage: TPage) => boolean) {

    this.nextCursor = initialCursor;
    this._getNextPage = getNextPage;
    this._extractNextCursor = extractNextCursor;
    this._isCompleted = isCompleted;
  }

  public nextCursor: TCursor;
  public completed: boolean;

  public async nextPageAsync(): Promise<ITwitterIteratorPageResult<TPage, TCursor>> {
    if (this.completed) {
      throw new TwitterIteratorAlreadyCompletedException();
    }

    let page = await this._getNextPage(this.nextCursor); // .ConfigureAwait(false);
    this.nextCursor = this._extractNextCursor(page);
    this.completed = this._isCompleted(page);

    return new TwitterIteratorPageResult<TPage, TCursor>(page, this.nextCursor, this.completed);
  }
}

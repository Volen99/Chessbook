import {ITwitterIterator} from "../../Public/Iterators/ITwitterIterator";
import {ITwitterIteratorPage} from "../../Public/Iterators/ITwitterIteratorPage";
import {TwitterIteratorPage} from "./Models/TwitterIteratorPage";
import {ITwitterPageIterator} from "./TwitterPageIterator";

// export class TwitterIteratorProxy<TInput, TOutput> extends TwitterIteratorProxy<TInput, TOutput, string> implements ITwitterIterator<TOutput> {
//   constructor(source: ITwitterPageIterator<TInput, string>, transform: Func<TInput, TOutput[]>) {
//     super(source, transform);
//   }
// }

export class TwitterIteratorProxy<TInput, TOutput, TCursor = any> implements ITwitterIterator<TOutput, TCursor> {
  private readonly _source: ITwitterPageIterator<TInput, TCursor>;
  private readonly _transform: (tInput: TInput) => TOutput[];

  constructor(source: ITwitterPageIterator<TInput, TCursor>, transform: (tInput: TInput) => TOutput[]) {
    this._source = source;
    if (transform instanceof Array) {
      this._transform = input => transform(input);
    }
    this._transform = transform;
  }

  public nextCursor: TCursor;
  public completed: boolean;

  public async nextPageAsync(): Promise<ITwitterIteratorPage<TOutput, TCursor>> {
    let page = await this._source.nextPageAsync(); // .ConfigureAwait(false);
    let items = this._transform(page.result.Content);

    this.nextCursor = page.result.NextCursor;
    this.completed = page.result.IsLastPage;

    return new TwitterIteratorPage<TOutput[], TOutput, TCursor>(items, NextCursor, Completed);
  }
}

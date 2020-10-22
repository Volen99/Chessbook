import {ITwitterResult} from "../Web/TwitterResult";
import {ITwitterPageIterator} from "./TwitterPageIterator";
import {IMultiLevelCursorIterator} from "../../Public/Iterators/IMultiLevelCursorIterator";
import {ITwitterClient} from "../../Public/ITwitterClient";
import {IIdsCursorQueryResultDTO} from "../../Public/Models/Interfaces/DTO/QueryDTO/IIdsCursorQueryResultDTO";
import {IUser} from "../../Public/Models/Interfaces/IUser";
import {MultiLevelCursorIterator} from "./MultiLevelCursorIterator";
import {CursorPageResult} from "./Models/CursorPageResult";
import {MultiLevelPageProcessingResult} from "./Models/MultiLevelPageProcessingResult";
import {InjectionToken} from "@angular/core";

export interface IMultiLevelCursorIteratorFactory {
  create<TDTO, TInput, TOutput>(
    pageIterator: ITwitterPageIterator<ITwitterResult<TDTO>>,
    transform: (tDTO: TDTO) => TInput[],
    getChildItems: (tInput: TInput[]) => Promise<TOutput[]>,
    maxPageSize: number): IMultiLevelCursorIterator<TInput, TOutput>;

  createUserMultiLevelIterator(
    client: ITwitterClient,
    iterator: ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>>,
    maxPageSize: number): IMultiLevelCursorIterator<number, IUser>;
}

export class MultiLevelCursorIteratorFactory implements IMultiLevelCursorIteratorFactory {
  public create<TDTO, TInput, TOutput>(
    pageIterator: ITwitterPageIterator<ITwitterResult<TDTO>>,
    transform: (tDTO: TDTO) => TInput[],
    getChildItems: (tInput: TInput[]) => Promise<TOutput[]>,
    maxPageSize: number): IMultiLevelCursorIterator<TInput, TOutput> {
    let iterator: MultiLevelCursorIterator<TInput, TOutput> = new MultiLevelCursorIterator<TInput, TOutput>(async () => {
      let userIdsPage = await pageIterator.nextPageAsync(); // .ConfigureAwait(false);

      let result = new CursorPageResult<TInput, string>();
      result.items = transform(userIdsPage.result.Content.Model);
      result.nextCursor = userIdsPage.result.NextCursor;
      result.isLastPage = userIdsPage.result.IsLastPage;

      return result;
    }, async inputs => {
      let userIdsToAnalyze = inputs.filter((tInput, num) => num < maxPageSize); // Take(maxPageSize).ToArray();
      let friends = await getChildItems(userIdsToAnalyze); // .ConfigureAwait(false);

      let result = new MultiLevelPageProcessingResult<TInput, TOutput>();
      result.items = friends;
      result.associatedParentItems = userIdsToAnalyze;

      return result;
    });

    return iterator;
  }

  public createUserMultiLevelIterator(client: ITwitterClient, iterator: ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>>, maxPageSize: number): IMultiLevelCursorIterator<number, IUser> {
    return this.create(iterator, dtoIds => dtoIds.ids, client.users.getUsersAsync, maxPageSize);
  }
}


export const IMultiLevelCursorIteratorFactoryToken = new InjectionToken<IMultiLevelCursorIteratorFactory>('IMultiLevelCursorIteratorFactory', {
  providedIn: 'root',
  factory: () => new,
});

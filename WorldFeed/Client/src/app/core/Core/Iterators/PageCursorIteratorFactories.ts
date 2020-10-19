import {ITwitterResult} from "../Web/TwitterResult";
import {ContinueMinMaxCursor, IMinMaxQueryParameters} from "../../Public/Parameters/MaxAndMinBaseQueryParameters";
import {ICursorQueryParameters} from "../../Public/Parameters/CursorQueryParameters";
import {ITwitterPageIterator, TwitterPageIterator} from "./TwitterPageIterator";
import {ITwitterIdentifier} from "../../Public/Models/Interfaces/ITwitterIdentifier";
import {IBaseCursorQueryDTO} from "../../Public/Models/Interfaces/DTO/QueryDTO/IBaseCursorQueryDTO";

export interface IPageCursorIteratorFactories {
  create<T extends ITwitterIdentifier>(parameters: IMinMaxQueryParameters, getNext: (num: number) => Promise<ITwitterResult<T[]>>): ITwitterPageIterator<ITwitterResult<T[]>, number>; // long?
  createCursor<T extends IBaseCursorQueryDTO>(parameters: ICursorQueryParameters, getNext: (str: string) => Promise<ITwitterResult<T>>): ITwitterPageIterator<ITwitterResult<T>>;
}

export class PageCursorIteratorFactories implements IPageCursorIteratorFactories {
  public create<T extends ITwitterIdentifier>(minMaxOrCursorQueryParameters: IMinMaxQueryParameters, getNext: (num: number) => Promise<ITwitterResult<T[]>>):
    ITwitterPageIterator<ITwitterResult<T[]>, number> {
    let twitterCursorResult = new TwitterPageIterator<ITwitterResult<T[]>, number>(minMaxOrCursorQueryParameters.maxId, getNext, page => {        // long?
        if (page.model.length === 0) {
          return null;
        }

        return page.model?.reduce((ya, u) => Math.min(ya, u.id), Number.MAX_VALUE);    // Min(x => x.Id) - 1;
      },
      page => {
        if (minMaxOrCursorQueryParameters.continueMinMaxCursor === ContinueMinMaxCursor.UntilPageSizeIsDifferentFromRequested) {
          return page.model.length < minMaxOrCursorQueryParameters.pageSize;
        }

        return page.model.length === 0;
      });

    return twitterCursorResult;
  }

  public createCursor<T extends IBaseCursorQueryDTO>(parameters: ICursorQueryParameters, getNext: (str: string) => Promise<ITwitterResult<T>>): ITwitterPageIterator<ITwitterResult<T>> {
    let twitterCursorResult = new TwitterPageIterator<ITwitterResult<T>>(parameters.cursor, getNext,
      page => page.model.nextCursorStr,
      page => page.model.nextCursorStr === "0");

    return twitterCursorResult;
  }
}

import IEnumerable from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Enumeration/IEnumerable";
import {ITweetDTO} from "../../core/Public/Models/Interfaces/DTO/ITweetDTO";

export interface ITweetHelper {
  getOldestTweetId(tweetDTOs: IEnumerable<ITweetDTO>): number;
}

export class TweetHelper implements ITweetHelper {
  public getOldestTweetId(tweetDTOs: IEnumerable<ITweetDTO>): number {
    return Number(tweetDTOs.Min(x => x.IdStr));
  }
}

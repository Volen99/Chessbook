import IEnumerable from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Enumeration/IEnumerable";

export interface ITweetHelper {
  GetOldestTweetId(tweetDTOs: IEnumerable<ITweetDTO>): number;
}

export class TweetHelper implements ITweetHelper {
  public GetOldestTweetId(tweetDTOs: IEnumerable<ITweetDTO>): number {
    return long.Parse(tweetDTOs.Min(x => x.IdStr));
  }
}

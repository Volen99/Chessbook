//
// export interface TweetHelper {
//   getOldestTweetId(tweetDTOs: Iterable<ITweetDTO>): number;
// }
//
// // TODO: Nobody uses this class?!
// export class TweetHelper implements TweetHelper {
//   public getOldestTweetId(tweetDTOs: Iterable<ITweetDTO>): number {
//     return [...tweetDTOs].reduce((ya, u) => Math.min(ya, Number(u.idStr)), Number.MAX_VALUE); // Number(tweetDTOs.Min(x => x.IdStr));
//   }
// }

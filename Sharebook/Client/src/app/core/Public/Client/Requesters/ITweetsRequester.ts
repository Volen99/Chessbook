import {ITwitterResult} from "../../../Core/Web/TwitterResult";
import {IGetTweetParameters} from "../../Parameters/TweetsClient/GetTweetParameters";
import {ITweetDTO} from "../../Models/Interfaces/DTO/ITweetDTO";
import {IPublishTweetParameters} from "../../Parameters/TweetsClient/PublishTweetParameters";
import {IDestroyTweetParameters} from "../../Parameters/TweetsClient/DestroyTweetParameters";
import {IGetUserFavoriteTweetsParameters} from "../../Parameters/TweetsClient/GetFavoriteTweetsParameters";
import {ITwitterPageIterator} from "../../../Core/Iterators/TwitterPageIterator";
import {IGetTweetsParameters} from "../../Parameters/TweetsClient/GetTweetsParameters";
import {IGetRetweetsParameters} from "../../Parameters/TweetsClient/GetRetweetsParameters";
import {IPublishRetweetParameters} from "../../Parameters/TweetsClient/PublishRetweetParameters";
import {IGetRetweeterIdsParameters} from "../../Parameters/TweetsClient/GetRetweeterIdsParameters";
import {IIdsCursorQueryResultDTO} from "../../Models/Interfaces/DTO/QueryDTO/IIdsCursorQueryResultDTO";
import {IDestroyRetweetParameters} from "../../Parameters/TweetsClient/DestroyRetweetParameters";
import {IFavoriteTweetParameters} from "../../Parameters/TweetsClient/FavoriteTweetParameters";
import {IUnfavoriteTweetParameters} from "../../Parameters/TweetsClient/UnFavoriteTweetParameters";
import {IGetOEmbedTweetParameters} from "../../Parameters/TweetsClient/GetOEmbedTweetParameters";
import {IOEmbedTweetDTO} from "../../Models/Interfaces/DTO/IOembedTweetDTO";

// A client providing all the methods related with tweets. The results from this client contain additional metadata.
export interface ITweetsRequester {
  /// <summary>
  /// Get a tweet
  /// <para>Read more : https://dev.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-show-id </para>
  /// </summary>
  /// <returns>TwitterResult containing specified tweet</returns>
  getTweetAsync(parameters: IGetTweetParameters): Promise<ITwitterResult<ITweetDTO>>;

  /// <summary>
  /// Publish a tweet
  /// <para>Read more : https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-show-id </para>
  /// </summary>
  /// <returns>TwitterResult containing the published tweet</returns>
  publishTweetAsync(parameters: IPublishTweetParameters): Promise<ITwitterResult<ITweetDTO>>;

  /// <summary>
  /// Destroy a tweet
  /// <para>Read more : https://dev.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-statuses-destroy-id </para>
  /// </summary>
  /// <returns>TwitterResult containing the destroyed tweet</returns>
  destroyTweetAsync(parameters: IDestroyTweetParameters): Promise<ITwitterResult<ITweetDTO>>;

  /// <summary>
  /// Get favorite tweets of a user
  /// <para>Read more : https://dev.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-favorites-list </para>
  /// </summary>
  /// <returns>Iterator over the list of tweets favorited by a user</returns>
  getUserFavoriteTweetsIterator(parameters: IGetUserFavoriteTweetsParameters): ITwitterPageIterator<ITwitterResult<ITweetDTO[]>, number>; // long?

  /// <summary>
  /// Get multiple tweets
  /// <para>Read more : https://dev.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-lookup </para>
  /// </summary>
  /// <returns>TwitterResult containing requested tweets</returns>
  getTweetsAsync(parameters: IGetTweetsParameters): Promise<ITwitterResult<ITweetDTO[]>>;

  /// <summary>
  /// Get the retweets associated with a specific tweet
  /// <para>Read more : https://dev.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-retweets-id </para>
  /// </summary>
  /// <returns>TwitterResult containing the retweets</returns>
  getRetweetsAsync(parameters: IGetRetweetsParameters): Promise<ITwitterResult<ITweetDTO[]>>;

  /// <summary>
  /// Publish a retweet
  /// <para>Read more : https://dev.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-statuses-retweet-id </para>
  /// </summary>
  /// <returns>TwitterResult containing the published retweet</returns>
  gublishRetweetAsync(parameters: IPublishRetweetParameters): Promise<ITwitterResult<ITweetDTO>>;

  /// <summary>
  /// Get the ids of the users who retweeted a specific tweet
  /// <para> Read more : https://dev.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-retweeters-ids </para>
  /// </summary>
  /// <returns>TwitterCursorResult to iterate over all the user's friends</returns>
  getRetweeterIdsIterator(parameters: IGetRetweeterIdsParameters): ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>>;

  /// <summary>
  /// Destroy a retweet
  /// <para>Read more : https://dev.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-statuses-unretweet-id </para>
  /// </summary>
  /// <returns>TwitterResult containing the success status of the request</returns>
  destroyRetweetAsync(parameters: IDestroyRetweetParameters): Promise<ITwitterResult<ITweetDTO>>;

  /// <summary>
  /// Favorite a tweet
  /// </summary>
  /// <para>Read more : https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-favorites-destroy </para>
  /// <returns>TwitterResult containing the favorited tweet</returns>
  favoriteTweetAsync(parameters: IFavoriteTweetParameters): Promise<ITwitterResult<ITweetDTO>>;

  /// <summary>
  /// Remove the favorite of a tweet
  /// </summary>
  /// <para>Read more : https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-favorites-destroy </para>
  /// <returns>TwitterResult containing the no longer favorited tweet</returns>
  unfavoriteTweetAsync(parameters: IUnfavoriteTweetParameters): Promise<ITwitterResult<ITweetDTO>>;

  /// <summary>
  /// Get an oembed tweet
  /// </summary>
  /// <para>Read more : https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-oembed </para>
  /// <returns>TwitterResult containing the oembed tweet</returns>
  getOEmbedTweetAsync(parameters: IGetOEmbedTweetParameters): Promise<ITwitterResult<IOEmbedTweetDTO>>;
}

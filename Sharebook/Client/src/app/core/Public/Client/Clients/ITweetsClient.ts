import {Inject, InjectionToken} from "@angular/core";

import {ITwitterIterator} from "../../Iterators/ITwitterIterator";
import {IUserIdentifier} from "../../Models/Interfaces/IUserIdentifier";
import {ITweet} from "../../Models/Interfaces/ITweet";
import {IGetTweetParameters} from "../../Parameters/TweetsClient/GetTweetParameters";
import {IGetTweetsParameters} from "../../Parameters/TweetsClient/GetTweetsParameters";
import {IPublishTweetParameters} from "../../Parameters/TweetsClient/PublishTweetParameters";
import {ITweetIdentifier} from "../../Models/Interfaces/ITweetIdentifier";
import {ITweetDTO} from "../../Models/Interfaces/DTO/ITweetDTO";
import {IDestroyTweetParameters} from "../../Parameters/TweetsClient/DestroyTweetParameters";
import {IGetRetweetsParameters} from "../../Parameters/TweetsClient/GetRetweetsParameters";
import {IPublishRetweetParameters} from "../../Parameters/TweetsClient/PublishRetweetParameters";
import {IDestroyRetweetParameters} from "../../Parameters/TweetsClient/DestroyRetweetParameters";
import {IGetRetweeterIdsParameters} from "../../Parameters/TweetsClient/GetRetweeterIdsParameters";
import {IGetUserFavoriteTweetsParameters} from "../../Parameters/TweetsClient/GetFavoriteTweetsParameters";
import {IFavoriteTweetParameters} from "../../Parameters/TweetsClient/FavoriteTweetParameters";
import {IUnfavoriteTweetParameters} from "../../Parameters/TweetsClient/UnFavoriteTweetParameters";
import {IOEmbedTweet} from "../../Models/Interfaces/IOEmbedTweet";
import {IGetOEmbedTweetParameters} from "../../Parameters/TweetsClient/GetOEmbedTweetParameters";
import {ITweetsClientParametersValidator} from "../../../Core/Client/Validators/TweetsClientParametersValidator";
import {TweetsClient} from "../../../../sharebook/Client/Clients/TweetsClient";
import {TwitterClient} from "../../../../sharebook/TwitterClient";

export interface ITweetsClient {
  // Validate all the Tweets client parameters
  parametersValidator: ITweetsClientParametersValidator;

  getTweetAsync(tweetId: number): Promise<ITweet>;

  /// <summary>
  /// Get a tweet
  /// <para>Read more : https://dev.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-show-id </para>
  /// </summary>
  /// <returns>The tweet</returns>
  getTweetAsync(parameters: IGetTweetParameters): Promise<ITweet>;

  getTweetsAsync(tweetIds: number[]): Promise<ITweet[]>;

  getTweetsAsync(tweets: ITweetIdentifier[]): Promise<ITweet[]>;

  /// <summary>
  /// Get multiple tweets
  /// <para>Read more : https://dev.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-lookup </para>
  /// </summary>
  /// <returns>Requested tweets</returns>
  getTweetsAsync(parameters: IGetTweetsParameters): Promise<ITweet[]>;

  publishTweetAsync(text: string): Promise<ITweet>;

  /// <summary>
  /// Publish a tweet
  /// <para>Read more : https://dev.twitter.com/rest/reference/post/statuses/update </para>
  /// </summary>
  /// <returns>Returns the published tweet</returns>
  publishTweetAsync(parameters: IPublishTweetParameters): Promise<ITweet>;

  destroyTweetAsync(tweetId: number): Promise<void>;

  destroyTweetAsync(tweet: ITweetIdentifier): Promise<void>;

  destroyTweetAsync(tweet: ITweet): Promise<void>;

  destroyTweetAsync(tweet: ITweetDTO): Promise<void>;

  /// <summary>
  /// Destroy a tweet
  /// <para>Read more : https://dev.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-statuses-destroy-id </para>
  /// </summary>
  destroyTweetAsync(parameters: IDestroyTweetParameters): Promise<void>;

  getRetweetsAsync(tweetId: number): Promise<ITweet[]>;

  getRetweetsAsync(tweet: ITweetIdentifier): Promise<ITweet[]>;

  /// <summary>
  /// Get the retweets associated with a specific tweet
  /// <para>Read more : https://dev.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-retweets-id </para>
  /// </summary>
  /// <returns>Retweets</returns>
  getRetweetsAsync(parameters: IGetRetweetsParameters): Promise<ITweet[]>;

  publishRetweetAsync(tweetId: number): Promise<ITweet>;

  publishRetweetAsync(tweet: ITweetIdentifier): Promise<ITweet>;

  /// <summary>
  /// Publish a retweet
  /// <para>Read more : https://dev.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-statuses-retweet-id </para>
  /// </summary>
  /// <returns>The retweet</returns>
  publishRetweetAsync(parameters: IPublishRetweetParameters): Promise<ITweet>;

  destroyRetweetAsync(retweetId: number): Promise<void>;

  destroyRetweetAsync(retweet: ITweetIdentifier): Promise<void>;

  /// <summary>
  /// Destroy a retweet
  /// <para>Read more : https://dev.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-statuses-unretweet-id </para>
  /// </summary>
  destroyRetweetAsync(parameters: IDestroyRetweetParameters): Promise<void>;

  getRetweeterIdsAsync(tweetId: number): Promise<number[]>;

  getRetweeterIdsAsync(tweet: ITweetIdentifier): Promise<number[]>;

  /// <summary>
  /// Get the ids of the users who retweeted a specific tweet
  /// <para> Read more : https://dev.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-retweeters-ids </para>
  /// </summary>
  /// <returns>List the retweeter ids</returns>
  getRetweeterIdsAsync(parameters: IGetRetweeterIdsParameters): Promise<number[]>;

  getRetweeterIdsIterator(tweetId: number): ITwitterIterator<number>;

  getRetweeterIdsIterator(tweet: ITweetIdentifier): ITwitterIterator<number>;

  /// <summary>
  /// Get the ids of the users who retweeted a specific tweet
  /// <para> Read more : https://dev.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-retweeters-ids </para>
  /// </summary>
  /// <returns>An iterator to list the retweeter ids</returns>
  getRetweeterIdsIterator(parameters: IGetRetweeterIdsParameters): ITwitterIterator<number>;

  getUserFavoriteTweetsAsync(userId: number): Promise<ITweet[]>;

  getUserFavoriteTweetsAsync(username: string): Promise<ITweet[]>;

  getUserFavoriteTweetsAsync(user: IUserIdentifier): Promise<ITweet[]>;

  /// <summary>
  /// Get favorite tweets of a user
  /// <para>Read more : https://dev.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-favorites-list </para>
  /// </summary>
  /// <returns>List the favorite tweets</returns>
  getUserFavoriteTweetsAsync(parameters: IGetUserFavoriteTweetsParameters): Promise<ITweet[]>;

  getUserFavoriteTweetsIterator(userId: number): ITwitterIterator<ITweet, number>;         // long?
  getUserFavoriteTweetsIterator(username: string): ITwitterIterator<ITweet, number>;       // long?
  getUserFavoriteTweetsIterator(user: IUserIdentifier): ITwitterIterator<ITweet, number>; // long?

  /// <summary>
  /// Get favorite tweets of a user
  /// <para>Read more : https://dev.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-favorites-list </para>
  /// </summary>
  /// <returns>An iterator to list the favorite tweets</returns>
  getUserFavoriteTweetsIterator(parameters: IGetUserFavoriteTweetsParameters): ITwitterIterator<ITweet, number>; // long?

  favoriteTweetAsync(tweetId: number): Promise<void>;

  favoriteTweetAsync(tweet: ITweetIdentifier): Promise<void>;

  favoriteTweetAsync(tweet: ITweet): Promise<void>;

  favoriteTweetAsync(tweet: ITweetDTO): Promise<void>;

  /// <summary>
  /// Favorite a tweet
  /// </summary>
  /// <para>Read more : https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-favorites-create </para>
  favoriteTweetAsync(parameters: IFavoriteTweetParameters): Promise<void>;

  unfavoriteTweetAsync(tweetId: number): Promise<void>;

  unfavoriteTweetAsync(tweet: ITweetIdentifier): Promise<void>;

  unfavoriteTweetAsync(tweet: ITweet): Promise<void>;

  unfavoriteTweetAsync(tweet: ITweetDTO): Promise<void>;

  /// <summary>
  /// Remove the favorite of a tweet
  /// </summary>
  /// <para>Read more : https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-favorites-destroy </para>
  unfavoriteTweetAsync(parameters: IUnfavoriteTweetParameters): Promise<void>;

  getOEmbedTweetAsync(tweet: ITweetIdentifier): Promise<IOEmbedTweet>;

  getOEmbedTweetAsync(tweetId: number): Promise<IOEmbedTweet>;

  /// <summary>
  /// Get an oembed tweet
  /// </summary>
  /// <para>Read more : https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-oembed </para>
  /// <returns>The generated oembed tweet</returns>
  getOEmbedTweetAsync(parameters: IGetOEmbedTweetParameters): Promise<IOEmbedTweet>;
}

export const ITweetsClientToken = new InjectionToken<ITweetsClient>('ITweetsClient', {
  providedIn: 'root',
  factory: () => new TweetsClient(Inject(TwitterClient)),
});

import {IUserIdentifier} from "../../Models/Interfaces/IUserIdentifier";
import {ITwitterIterator} from "../../Iterators/ITwitterIterator";
import {ITweet} from "../../Models/Interfaces/ITweet";
import {IGetHomeTimelineParameters} from "../../Parameters/TimelineClient/GetHomeTimelineParameters";
import {IGetMentionsTimelineParameters} from "../../Parameters/TimelineClient/GetMentionsTimelineParameters";
import {IGetUserTimelineParameters} from "../../Parameters/TimelineClient/GetUserTimelineParameters";
import {IGetRetweetsOfMeTimelineParameters} from "../../Parameters/TimelineClient/GetRetweetsOfMeTimelineParameters";
import {ITimelineClientParametersValidator} from "../../../Core/Client/Validators/TimelineClientParametersValidator";
import {InjectionToken} from "@angular/core";

export interface ITimelinesClient {
  // Validate all the Timelines client parameters
  parametersValidator: ITimelineClientParametersValidator;

  getHomeTimelineAsync(): Promise<ITweet[]>;

  /// <summary>
  /// Returns a collection of the most recent Tweets and Retweets posted by the authenticated user and the users they follow.
  /// The home timeline is central to how most users interact with the Twitter service.
  ///
  /// Up to 800 Tweets are obtainable on the home timeline.
  /// It is more volatile for users that follow many users or follow users who Tweet frequently.
  /// </summary>
  /// <para>Read more : https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-home_timeline </para>
  /// <returns>List the of tweets displayed on the authenticated user's home page</returns>
  getHomeTimelineAsync(parameters: IGetHomeTimelineParameters): Promise<ITweet[]>;

  getHomeTimelineIterator(): ITwitterIterator<ITweet, number>; // ?long

  /// <summary>
  /// Returns a collection of the most recent Tweets and Retweets posted by the authenticated user and the users they follow.
  /// The home timeline is central to how most users interact with the Twitter service.
  ///
  /// Up to 800 Tweets are obtainable on the home timeline.
  /// It is more volatile for users that follow many users or follow users who Tweet frequently.
  /// </summary>
  /// <para>Read more : https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-home_timeline </para>
  /// <returns>An iterator to list the of tweets displayed on the authenticated user's home page</returns>
  getHomeTimelineIterator(parameters: IGetHomeTimelineParameters): ITwitterIterator<ITweet, number>;


  getMentionsTimelineAsync(): Promise<ITweet[]>;

  /// <summary>
  /// Returns the most recent mentions (Tweets containing a users's @screen_name) for the authenticated user.
  /// The timeline returned is the equivalent of the one seen when you view your mentions on twitter.com.
  /// </summary>
  /// <para>Read more : https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-mentions_timeline </para>
  /// <returns>List the of tweets mentioning the authenticated user</returns>
  getMentionsTimelineAsync(parameters: IGetMentionsTimelineParameters): Promise<ITweet[]>;

  getMentionsTimelineIterator(): ITwitterIterator<ITweet, number>; // long?

  /// <summary>
  /// Returns the most recent mentions (Tweets containing a users's @screen_name) for the authenticated user.
  /// The timeline returned is the equivalent of the one seen when you view your mentions on twitter.com.
  /// </summary>
  /// <para>Read more : https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-mentions_timeline </para>
  /// <returns>An iterator to list the of tweets mentioning the authenticated user</returns>
  getMentionsTimelineIterator(parameters: IGetMentionsTimelineParameters): ITwitterIterator<ITweet, number>; // long?


  getUserTimelineAsync(userId: number): Promise<ITweet[]>;

  getUserTimelineAsync(username: string): Promise<ITweet[]>;

  getUserTimelineAsync(user: IUserIdentifier): Promise<ITweet[]>;

  /// <summary>
  /// Returns a collection of the most recent Tweets posted by the user indicated by the screen_name or user_id parameters.
  /// </summary>
  /// <para>Read more : https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-user_timeline </para>
  /// <returns>Tweets visible in the user's timeline</returns>
  getUserTimelineAsync(parameters: IGetUserTimelineParameters): Promise<ITweet[]>;

  getUserTimelineIterator(userId: number): ITwitterIterator<ITweet, number>;        // long?

  getUserTimelineIterator(username: string): ITwitterIterator<ITweet, number>;      // long?

  getUserTimelineIterator(user: IUserIdentifier): ITwitterIterator<ITweet, number>; // long?

  /// <summary>
  /// Returns a collection of the most recent Tweets posted by the user indicated by the screen_name or user_id parameters.
  /// </summary>
  /// <para>Read more : https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-user_timeline </para>
  /// <returns>An iterator to list tweets visible in the user's timeline</returns>
  getUserTimelineIterator(parameters: IGetUserTimelineParameters): ITwitterIterator<ITweet, number>; // long?


  getRetweetsOfMeTimelineAsync(): Promise<ITweet[]>;

  /// <summary>
  /// Returns the most recent Tweets authored by the authenticating user that have been retweeted by others.
  /// This timeline is a subset of the account user's timeline.
  /// <para>Read more : https://dev.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-retweets_of_me </para>
  /// </summary>
  /// <returns>The tweets retweeted by others</returns>
  getRetweetsOfMeTimelineAsync(parameters: IGetRetweetsOfMeTimelineParameters): Promise<ITweet[]>;

  getRetweetsOfMeTimelineIterator(): ITwitterIterator<ITweet, number>;  // long?

  /// <summary>
  /// Returns the most recent Tweets authored by the authenticating user that have been retweeted by others.
  /// This timeline is a subset of the account user's timeline.
  /// <para>Read more : https://dev.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-retweets_of_me </para>
  /// </summary>
  /// <returns>An iterator to list the tweets that got retweeted by others</returns>
  getRetweetsOfMeTimelineIterator(parameters: IGetRetweetsOfMeTimelineParameters): ITwitterIterator<ITweet, number>; // long?
}


export const ITimelinesClientToken = new InjectionToken<ITimelinesClient>('ITimelinesClient', {
  providedIn: 'root',
  factory: () => new,
});

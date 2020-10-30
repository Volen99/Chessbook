import {Inject, InjectionToken} from "@angular/core";

import {ITwitterResult} from "../../../Core/Web/TwitterResult";
import {IGetUserTimelineParameters} from "../../Parameters/TimelineClient/GetUserTimelineParameters";
import {ITwitterPageIterator} from "../../../Core/Iterators/TwitterPageIterator";
import {ITweetDTO} from "../../Models/Interfaces/DTO/ITweetDTO";
import {IGetHomeTimelineParameters} from "../../Parameters/TimelineClient/GetHomeTimelineParameters";
import {IGetRetweetsOfMeTimelineParameters} from "../../Parameters/TimelineClient/GetRetweetsOfMeTimelineParameters";
import {IGetMentionsTimelineParameters} from "../../Parameters/TimelineClient/GetMentionsTimelineParameters";
import {TimelinesRequester} from "../../../../sharebook/Client/Requesters/TimelinesRequester";
import {TwitterClientEvents} from "../../../Core/Events/TweetinviGlobalEvents";
import {TimelineClientRequiredParametersValidator} from "../../../Core/Client/Validators/TimelineClientRequiredParametersValidator";
import {TimelineController} from "../../../../controllers/Timeline/TimelineController";
import {TwitterClient} from "../../../../sharebook/TwitterClient";

// A client providing all the actions relative to timelines.
// The results from this client contain additional metadata.
export interface ITimelinesRequester {
  /// <summary>
  /// Returns a collection of the most recent Tweets posted by the user indicated by the screen_name or user_id parameters.
  /// </summary>
  /// <para>Read more : https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-user_timeline </para>
  /// <returns>An iterator to list a user's timeline</returns>
  getUserTimelineIterator(parameters: IGetUserTimelineParameters): ITwitterPageIterator<ITwitterResult<ITweetDTO[]>, number>;   // long?

  /// <summary>
  /// Returns a collection of the most recent Tweets and Retweets posted by the authenticating user and the users they follow.
  /// The home timeline is central to how most users interact with the Twitter service.
  ///
  /// Up to 800 Tweets are obtainable on the home timeline.
  /// It is more volatile for users that follow many users or follow users who Tweet frequently.
  /// </summary>
  /// <para>Read more : https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-home_timeline </para>
  /// <returns>An iterator to list the of tweets displayed on the authenticated user's home page</returns>
  getHomeTimelineIterator(parameters: IGetHomeTimelineParameters): ITwitterPageIterator<ITwitterResult<ITweetDTO[]>, number>;  // long?

  /// <summary>
  /// Returns the most recent Tweets authored by the authenticating user that have been retweeted by others.
  /// This timeline is a subset of the account user's timeline.
  /// <para>Read more : https://dev.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-retweets_of_me </para>
  /// </summary>
  /// <returns>An iterator to list the accounts tweet that got retweeted</returns>
  getRetweetsOfMeTimelineIterator(parameters: IGetRetweetsOfMeTimelineParameters): ITwitterPageIterator<ITwitterResult<ITweetDTO[]>, number>; // long?

  /// <summary>
  /// Returns the most recent mentions (Tweets containing a users's @screen_name) for the authenticated user.
  /// The timeline returned is the equivalent of the one seen when you view your mentions on twitter.com.
  /// </summary>
  /// <para>Read more : https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-mentions_timeline </para>
  /// <returns>An iterator to list the of tweets mentioning the authenticated user's</returns>
  getMentionsTimelineIterator(parameters: IGetMentionsTimelineParameters): ITwitterPageIterator<ITwitterResult<ITweetDTO[]>, number>; // long?
}

export const ITimelinesRequesterToken = new InjectionToken<ITimelinesRequester>('ITimelinesRequester', {
  providedIn: 'root',
  factory: () => new TimelinesRequester(Inject(TwitterClient), Inject(TwitterClientEvents),
    Inject(TimelineController), Inject(TimelineClientRequiredParametersValidator)),
});

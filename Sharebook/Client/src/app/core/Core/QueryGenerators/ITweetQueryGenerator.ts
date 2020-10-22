import {ComputedTweetMode} from "./ComputedTweetMode";
import {IGetTweetParameters} from "../../Public/Parameters/TweetsClient/GetTweetParameters";
import {IGetTweetsParameters} from "../../Public/Parameters/TweetsClient/GetTweetsParameters";
import {IPublishTweetParameters} from "../../Public/Parameters/TweetsClient/PublishTweetParameters";
import {IDestroyTweetParameters} from "../../Public/Parameters/TweetsClient/DestroyTweetParameters";
import {IGetUserFavoriteTweetsParameters} from "../../Public/Parameters/TweetsClient/GetFavoriteTweetsParameters";
import {IGetRetweetsParameters} from "../../Public/Parameters/TweetsClient/GetRetweetsParameters";
import {IPublishRetweetParameters} from "../../Public/Parameters/TweetsClient/PublishRetweetParameters";
import {IDestroyRetweetParameters} from "../../Public/Parameters/TweetsClient/DestroyRetweetParameters";
import {IGetRetweeterIdsParameters} from "../../Public/Parameters/TweetsClient/GetRetweeterIdsParameters";
import {IFavoriteTweetParameters} from "../../Public/Parameters/TweetsClient/FavoriteTweetParameters";
import {IUnfavoriteTweetParameters} from "../../Public/Parameters/TweetsClient/UnFavoriteTweetParameters";
import {IGetOEmbedTweetParameters} from "../../Public/Parameters/TweetsClient/GetOEmbedTweetParameters";
import {InjectionToken} from "@angular/core";
import {TweetQueryGenerator} from "../../../controllers/Tweet/TweetQueryGenerator";

export interface ITweetQueryGenerator {
  getTweetQuery(parameters: IGetTweetParameters, tweetMode: ComputedTweetMode): string;

  getTweetsQuery(parameters: IGetTweetsParameters, tweetMode: ComputedTweetMode): string;

  getPublishTweetQuery(parameters: IPublishTweetParameters, tweetMode: ComputedTweetMode): string;

  getDestroyTweetQuery(parameters: IDestroyTweetParameters, tweetMode: ComputedTweetMode): string;

  getFavoriteTweetsQuery(parameters: IGetUserFavoriteTweetsParameters, tweetMode: ComputedTweetMode): string;

  getRetweetsQuery(parameters: IGetRetweetsParameters, tweetMode: ComputedTweetMode): string;

  getPublishRetweetQuery(parameters: IPublishRetweetParameters, tweetMode: ComputedTweetMode): string;

  getDestroyRetweetQuery(parameters: IDestroyRetweetParameters, tweetMode: ComputedTweetMode): string;

  getRetweeterIdsQuery(parameters: IGetRetweeterIdsParameters): string;

  getCreateFavoriteTweetQuery(parameters: IFavoriteTweetParameters): string;

  getUnfavoriteTweetQuery(parameters: IUnfavoriteTweetParameters): string;

  getOEmbedTweetQuery(parameters: IGetOEmbedTweetParameters): string;
}

export const ITweetQueryGeneratorToken = new InjectionToken<ITweetQueryGenerator>('ITweetQueryGenerator', {
  providedIn: 'root',
  factory: () => new TweetQueryGenerator(),
});

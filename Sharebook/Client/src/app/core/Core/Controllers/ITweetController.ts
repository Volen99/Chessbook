import {inject, Inject, InjectionToken} from "@angular/core";

import {ITwitterResult} from "../Web/TwitterResult";
import {ITwitterRequest} from "../../Public/Models/Interfaces/ITwitterRequest";
import {IGetTweetParameters} from "../../Public/Parameters/TweetsClient/GetTweetParameters";
import {ITweetDTO} from "../../Public/Models/Interfaces/DTO/ITweetDTO";
import {IGetTweetsParameters} from "../../Public/Parameters/TweetsClient/GetTweetsParameters";
import {IPublishTweetParameters} from "../../Public/Parameters/TweetsClient/PublishTweetParameters";
import {IDestroyTweetParameters} from "../../Public/Parameters/TweetsClient/DestroyTweetParameters";
import {IGetUserFavoriteTweetsParameters} from "../../Public/Parameters/TweetsClient/GetFavoriteTweetsParameters";
import {ITwitterPageIterator} from "../Iterators/TwitterPageIterator";
import {IPublishRetweetParameters} from "../../Public/Parameters/TweetsClient/PublishRetweetParameters";
import {IDestroyRetweetParameters} from "../../Public/Parameters/TweetsClient/DestroyRetweetParameters";
import {IGetRetweetsParameters} from "../../Public/Parameters/TweetsClient/GetRetweetsParameters";
import {IGetRetweeterIdsParameters} from "../../Public/Parameters/TweetsClient/GetRetweeterIdsParameters";
import {IOEmbedTweetDTO} from "../../Public/Models/Interfaces/DTO/IOembedTweetDTO";
import {IFavoriteTweetParameters} from "../../Public/Parameters/TweetsClient/FavoriteTweetParameters";
import {IUnfavoriteTweetParameters} from "../../Public/Parameters/TweetsClient/UnFavoriteTweetParameters";
import {IGetOEmbedTweetParameters} from "../../Public/Parameters/TweetsClient/GetOEmbedTweetParameters";
import {IIdsCursorQueryResultDTO} from "../../Public/Models/Interfaces/DTO/QueryDTO/IIdsCursorQueryResultDTO";
import {TweetController} from "../../../controllers/Tweet/TweetController";
import {TweetQueryExecutor} from "../../../controllers/Tweet/TweetQueryExecutor";
import {UploadQueryExecutor} from "../../../controllers/Upload/UploadQueryExecutor";
import {PageCursorIteratorFactories} from "../Iterators/PageCursorIteratorFactories";

export interface ITweetController {
  // TWEET
  getTweetAsync(parameters: IGetTweetParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO>>

  getTweetsAsync(parameters: IGetTweetsParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO[]>>

  publishTweetAsync(parameters: IPublishTweetParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO>>

  destroyTweetAsync(parameters: IDestroyTweetParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO>>


  // FAVORITES
  getFavoriteTweetsIterator(parameters: IGetUserFavoriteTweetsParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<ITweetDTO[]>, number> // long?


  canBePublished(text: string): boolean;

  canBePublished(publishTweetParameters: IPublishTweetParameters): boolean;

  // Retweets - Publish
  publishRetweetAsync(parameters: IPublishRetweetParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO>>;

  // Retweets - Destroy
  destroyRetweetAsync(parameters: IDestroyRetweetParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO>>;

  // Get Retweets
  getRetweetsAsync(parameters: IGetRetweetsParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO[]>>;

  // Get Retweeters
  getRetweeterIdsIterator(parameters: IGetRetweeterIdsParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>>;

  // Favorite Tweet
  favoriteTweetAsync(parameters: IFavoriteTweetParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO>>;

  unfavoriteTweetAsync(parameters: IUnfavoriteTweetParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO>>;

  getOEmbedTweetAsync(parameters: IGetOEmbedTweetParameters, request: ITwitterRequest): Promise<ITwitterResult<IOEmbedTweetDTO>>;
}

export const ITweetControllerToken = new InjectionToken<ITweetController>('ITweetController', {
  providedIn: 'root',
  factory: () => new TweetController(inject(TweetQueryExecutor), inject(UploadQueryExecutor),
    inject(PageCursorIteratorFactories)),
});

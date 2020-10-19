import {ITweetController} from "../../core/Core/Controllers/ITweetController";
import {IUploadQueryExecutor} from "../Upload/UploadQueryExecutor";
import {ITwitterResult} from "../../core/Core/Web/TwitterResult";
import { ITwitterRequest } from 'src/app/core/Public/Models/Interfaces/ITwitterRequest';
import {TwitterRequest} from "../../core/Public/TwitterRequest";
import {ITweetQueryExecutor} from "./TweetQueryExecutor";
import {IPageCursorIteratorFactories} from "../../core/Core/Iterators/PageCursorIteratorFactories";
import {IGetTweetParameters} from "../../core/Public/Parameters/TweetsClient/GetTweetParameters";
import {IGetTweetsParameters} from "../../core/Public/Parameters/TweetsClient/GetTweetsParameters";
import {IPublishTweetParameters, PublishTweetParameters} from "../../core/Public/Parameters/TweetsClient/PublishTweetParameters";
import {ITweetDTO} from "../../core/Public/Models/Interfaces/DTO/ITweetDTO";
import Type from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Types";
import {IPublishRetweetParameters} from "../../core/Public/Parameters/TweetsClient/PublishRetweetParameters";
import {WorldFeedConsts} from "../../core/Public/worldFeed-consts";
import {IDestroyRetweetParameters} from "../../core/Public/Parameters/TweetsClient/DestroyRetweetParameters";
import {IGetRetweetsParameters} from "../../core/Public/Parameters/TweetsClient/GetRetweetsParameters";
import {ITwitterPageIterator} from "../../core/Core/Iterators/TwitterPageIterator";
import {IIdsCursorQueryResultDTO} from "../../core/Public/Models/Interfaces/DTO/QueryDTO/IIdsCursorQueryResultDTO";
import {IGetOEmbedTweetParameters} from "../../core/Public/Parameters/TweetsClient/GetOEmbedTweetParameters";
import {IUnfavoriteTweetParameters} from "../../core/Public/Parameters/TweetsClient/UnFavoriteTweetParameters";
import {IFavoriteTweetParameters} from "../../core/Public/Parameters/TweetsClient/FavoriteTweetParameters";
import {
  GetUserFavoriteTweetsParameters,
  IGetUserFavoriteTweetsParameters
} from "../../core/Public/Parameters/TweetsClient/GetFavoriteTweetsParameters";
import {IDestroyTweetParameters} from "../../core/Public/Parameters/TweetsClient/DestroyTweetParameters";
import {GetRetweeterIdsParameters, IGetRetweeterIdsParameters} from "../../core/Public/Parameters/TweetsClient/GetRetweeterIdsParameters";

export class TweetController implements ITweetController {
  private readonly _tweetQueryExecutor: ITweetQueryExecutor;
  private readonly _uploadQueryExecutor: IUploadQueryExecutor;
  private readonly _pageCursorIteratorFactories: IPageCursorIteratorFactories;

  constructor(tweetQueryExecutor: ITweetQueryExecutor, uploadQueryExecutor: IUploadQueryExecutor,
              pageCursorIteratorFactories: IPageCursorIteratorFactories) {
    this._tweetQueryExecutor = tweetQueryExecutor;
    this._uploadQueryExecutor = uploadQueryExecutor;
    this._pageCursorIteratorFactories = pageCursorIteratorFactories;
  }

  public getTweetAsync(parameters: IGetTweetParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO>> {
    return this._tweetQueryExecutor.getTweetAsync(parameters, request);
  }

  public getTweetsAsync(parameters: IGetTweetsParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO[]>> {
    return this._tweetQueryExecutor.getTweetsAsync(parameters, request);
  }

  public async publishTweetAsync(parameters: IPublishTweetParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO>> {
    parameters.mediaIds.AddRange(parameters.medias.map(x => x.uploadedMediaInfo.mediaId));
    return await this._tweetQueryExecutor.publishTweetAsync(parameters, request).ConfigureAwait(false);
  }

  public canBePublished(publishTweetParameters: IPublishTweetParameters): boolean {
    return true;

    // return WorldFeedConsts.MAX_TWEET_SIZE >= EstimateTweetLength(publishTweetParameters);
  }

  public canBePublished(text: string): boolean {
    return true;

    // return WorldFeedConsts.MAX_TWEET_SIZE >= EstimateTweetLength(text);
  }

  public static estimateTweetLength(textOrParameters: string | IPublishTweetParameters): number {
    let parameters: IPublishTweetParameters;
    if (Type.isString(textOrParameters)) {
      parameters = new PublishTweetParameters(textOrParameters);
    } else {
      parameters = textOrParameters;
    }

    let text = parameters.text ?? "";
// #pragma warning disable 618
    let textLength = StringExtension.EstimateTweetLength(text);

    if (parameters.quotedTweet != null) {
      textLength = StringExtension.EstimateTweetLength(text.trim()) +
        1 + // for the space that needs to be added before the link to quoted tweet.
        WorldFeedConsts.MEDIA_CONTENT_SIZE;
// #pragma warning restore 618
    }

    if (parameters.hasMedia) {
      textLength += WorldFeedConsts.MEDIA_CONTENT_SIZE;
    }

    return textLength;
  }

  // Retweets - Publish
  public publishRetweetAsync(parameters: IPublishRetweetParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO>> {
    return this._tweetQueryExecutor.publishRetweetAsync(parameters, request);
  }

  // Retweets - Destroy

  public destroyRetweetAsync(parameters: IDestroyRetweetParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO>> {
    return this._tweetQueryExecutor.destroyRetweetAsync(parameters, request);
  }

  // #region GetRetweets

  public getRetweetsAsync(parameters: IGetRetweetsParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO[]>> {
    return this._tweetQueryExecutor.getRetweetsAsync(parameters, request);
  }

        // #endregion

  public getRetweeterIdsIterator(parameters: IGetRetweeterIdsParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>> {
    let result = this._pageCursorIteratorFactories.createCursor(parameters, cursor => {
      let cursoredParameters = new GetRetweeterIdsParameters(parameters);
      cursoredParameters.cursor = cursor;

      return this._tweetQueryExecutor.getRetweeterIdsAsync(cursoredParameters, new TwitterRequest(request));
    });

    return result;

  }

  // Destroy Tweet
  public destroyTweetAsync(parameters: IDestroyTweetParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO>> {
    return this._tweetQueryExecutor.destroyTweetAsync(parameters, request);
  }

  // Favorite Tweet
  public getFavoriteTweetsIterator(parameters: IGetUserFavoriteTweetsParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<ITweetDTO[]>, number> { // long?
    return this._pageCursorIteratorFactories.create(parameters, cursor => {
      let cursoredParameters = new GetUserFavoriteTweetsParameters(parameters);
      cursoredParameters.maxId = cursor;

      return this._tweetQueryExecutor.getFavoriteTweetsAsync(cursoredParameters, new TwitterRequest(request));
    });
  }

  public favoriteTweetAsync(parameters: IFavoriteTweetParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO>> {
    return this._tweetQueryExecutor.favoriteTweetAsync(parameters, request);
  }

  public unfavoriteTweetAsync(parameters: IUnfavoriteTweetParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO>> {
    return this._tweetQueryExecutor.unfavoriteTweetAsync(parameters, request);
  }

  public getOEmbedTweetAsync(parameters: IGetOEmbedTweetParameters, request: ITwitterRequest): Promise<ITwitterResult<IOEmbdTweetDTO>> {
    return this._tweetQueryExecutor.getOEmbedTweetAsync(parameters, request);
  }
}

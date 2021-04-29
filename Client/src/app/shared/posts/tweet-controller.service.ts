import {Inject, Injectable} from "@angular/core";
import {SharebookConsts} from "../../helpers/sharebook-consts";
import {IPublishTweetParameters, PublishTweetParameters} from "./parameters/publish-tweet-parameters";
import {IPublishRetweetParameters} from "./parameters/publish-retweet-parameters";
import {IDestroyRetweetParameters} from "./parameters/destroy-retweet-parameters";
import {IGetRetweetsParameters} from "./parameters/get-retweets-parameters";
import {GetRetweeterIdsParameters, IGetRetweeterIdsParameters} from "./parameters/get-retweeter-ids-parameters";
import {IDestroyTweetParameters} from "./parameters/destroy-tweet-parameters";
import {
  GetUserFavoriteTweetsParameters,
  IGetUserFavoriteTweetsParameters
} from "./parameters/get-favorite-tweets-Parameters";
import {IFavoriteTweetParameters} from "./parameters/favorite-tweet-parameters";
import {IUnfavoriteTweetParameters} from "./parameters/unfavorite-tweet-parameters";
import {IGetOEmbedTweetParameters} from "./parameters/get-OEmbed-tweet-parameters";
import {IGetTweetParameters} from "./parameters/get-tweet-parameters";
import {IGetTweetsParameters} from "./parameters/get-tweets-parameters";
import {TweetQueryExecutorService} from "./tweet-query-executor.service.";
import {ITweetDTO} from "./models/DTO/tweet-dto";

@Injectable()
export class TweetControllerService {
  // private readonly _pageCursorIteratorFactories: IPageCursorIteratorFactories;

  constructor(private tweetQueryExecutorService: TweetQueryExecutorService,
              /*private uploadQueryExecutorService: UploadQueryExecutorService*/) {
  }

  // public getTweetAsync(parameters: IGetTweetParameters): Promise<ITweetDTO> {
  //   return this.tweetQueryExecutorService.getTweetAsync(parameters);
  // }
  //
  // public getTweetsAsync(parameters: IGetTweetsParameters): Promise<ITweetDTO[]> {
  //   return this.tweetQueryExecutorService.getTweetsAsync(parameters);
  // }

  public async publishTweetAsync(parameters: IPublishTweetParameters): Promise<ITweetDTO> {
    parameters.mediaIds = parameters.mediaIds.concat(parameters.medias.map(x => x.uploadedMediaInfo.mediaId)); // .AddRange()
    return await this.tweetQueryExecutorService.publishTweetAsync(parameters);
  }

//   public canBePublished(textOrParameters: string | IPublishTweetParameters): boolean {
//     return true;
//
//     // for string
//     // return SharebookConsts.MAX_TWEET_SIZE >= EstimateTweetLength(text);
//
//     // for parameters
//     // return SharebookConsts.MAX_TWEET_SIZE >= EstimateTweetLength(publishTweetParameters);
//   }
//
//   public static estimateTweetLength(textOrParameters: string | IPublishTweetParameters): number {
//     let parametersCurrent: IPublishTweetParameters;
//     if (Type.isString(textOrParameters)) {
//       parametersCurrent = new PublishTweetParameters(textOrParameters);
//     } else {
//       parametersCurrent = textOrParameters;
//     }
//
//     let text = parametersCurrent.text ?? "";
// // #pragma warning disable 618
//     let textLength = StringExtension.estimateTweetLength(text);
//
//     if (parametersCurrent.quotedTweet != null) {
//       textLength = StringExtension.estimateTweetLength(text.trim()) +
//         1 + // for the space that needs to be added before the link to quoted tweet.
//         SharebookConsts.MEDIA_CONTENT_SIZE;
// // #pragma warning restore 618
//     }
//
//     if (parametersCurrent.hasMedia) {
//       textLength += SharebookConsts.MEDIA_CONTENT_SIZE;
//     }
//
//     return textLength;
//   }

  // Retweets - Publish
  public async publishRetweetAsync(parameters: IPublishRetweetParameters): Promise<ITweetDTO> {
    return await this.tweetQueryExecutorService.publishRetweetAsync(parameters);
  }

//
//   // Retweets - Destroy
//
//   public destroyRetweetAsync(parameters: IDestroyRetweetParameters): Promise<ITwitterResult<ITweetDTO>> {
//     return this.tweetQueryExecutorService.destroyRetweetAsync(parameters, request);
//   }
//
//   // #region GetRetweets
//
//   public getRetweetsAsync(parameters: IGetRetweetsParameters): Promise<ITwitterResult<ITweetDTO[]>> {
//     return this.tweetQueryExecutorService.getRetweetsAsync(parameters, request);
//   }
//
//         // #endregion
//
//   public getRetweeterIdsIterator(parameters: IGetRetweeterIdsParameters): ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>> {
//     let result = this._pageCursorIteratorFactories.createCursor(parameters, cursor => {
//       let cursoredParameters = new GetRetweeterIdsParameters(parameters);
//       cursoredParameters.cursor = cursor;
//
//       return this.tweetQueryExecutorService.getRetweeterIdsAsync(cursoredParameters, new TwitterRequest(request));
//     });
//
//     return result;
//
//   }
//
  // Destroy Tweet
  public async destroyTweetAsync(parameters: IDestroyTweetParameters, unshare = false): Promise<ITweetDTO> {
    return await this.tweetQueryExecutorService.destroyTweetAsync(parameters, unshare);
  }
//
//   // Favorite Tweet
//   public getFavoriteTweetsIterator(parameters: IGetUserFavoriteTweetsParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<ITweetDTO[]>, number> { // long?
//     return this._pageCursorIteratorFactories.create(parameters, cursor => {
//       let cursoredParameters = new GetUserFavoriteTweetsParameters(parameters);
//       cursoredParameters.maxId = cursor;
//
//       return this.tweetQueryExecutorService.getFavoriteTweetsAsync(cursoredParameters, new TwitterRequest(request));
//     });
//   }
//
//   public favoriteTweetAsync(parameters: IFavoriteTweetParameters): Promise<ITweetDTO> {
//     return this.tweetQueryExecutorService.favoriteTweetAsync(parameters);
//   }
//
//   public unfavoriteTweetAsync(parameters: IUnfavoriteTweetParameters): Promise<ITwitterResult<ITweetDTO>> {
//     return this.tweetQueryExecutorService.unfavoriteTweetAsync(parameters);
//   }
//
//   public getOEmbedTweetAsync(parameters: IGetOEmbedTweetParameters): Promise<ITwitterResult<IOEmbedTweetDTO>> {
//     return this.tweetQueryExecutorService.getOEmbedTweetAsync(parameters);
//   }
}

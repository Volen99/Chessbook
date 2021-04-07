import {inject, Inject, Injectable, InjectionToken} from "@angular/core";
import {IGetTweetParameters} from "./parameters/get-tweet-parameters";
import {IGetTweetsParameters} from "./parameters/get-tweets-parameters";
import {IPublishTweetParameters} from "./parameters/publish-tweet-parameters";
import {IPublishRetweetParameters} from "./parameters/publish-retweet-parameters";
import {IDestroyRetweetParameters} from "./parameters/destroy-retweet-parameters";
import {IGetRetweetsParameters} from "./parameters/get-retweets-parameters";
import {IGetRetweeterIdsParameters} from "./parameters/get-retweeter-ids-parameters";
import {IDestroyTweetParameters} from "./parameters/destroy-tweet-parameters";
import {IFavoriteTweetParameters} from "./parameters/favorite-tweet-parameters";
import {IUnfavoriteTweetParameters} from "./parameters/unfavorite-tweet-parameters";
import {IGetUserFavoriteTweetsParameters} from "./parameters/get-favorite-tweets-Parameters";
import {IGetOEmbedTweetParameters} from "./parameters/get-OEmbed-tweet-parameters";
import {TweetQueryGeneratorService} from "./tweet-query-generator.service";
import {PostsApi} from "./backend/posts.api";
import {ITweetDTO} from "./models/DTO/tweet-dto";
import {addWarning} from "@angular-devkit/build-angular/src/utils/webpack-diagnostics";

// export interface ITweetQueryExecutor {
//   getTweetAsync(parameters: IGetTweetParameters): Promise<ITwitterResult<ITweetDTO>>;
//
//   getTweetsAsync(parameters: IGetTweetsParameters): Promise<ITwitterResult<ITweetDTO[]>>;
//
//   publishTweetAsync(parameters: IPublishTweetParameters): Promise<ITwitterResult<ITweetDTO>>;
//
//
//   // Publish Retweet
//   publishRetweetAsync(parameters: IPublishRetweetParameters): Promise<ITwitterResult<ITweetDTO>>;
//
//   // UnRetweet
//   destroyRetweetAsync(parameters: IDestroyRetweetParameters): Promise<ITwitterResult<ITweetDTO>>;
//
//   // Get Retweets
//   getRetweetsAsync(parameters: IGetRetweetsParameters): Promise<ITwitterResult<ITweetDTO[]>>;
//
//   // Get Retweeters Ids
//   getRetweeterIdsAsync(parameters: IGetRetweeterIdsParameters): Promise<ITwitterResult<IIdsCursorQueryResultDTO>>;
//
//   // Destroy Tweet
//   destroyTweetAsync(parameters: IDestroyTweetParameters): Promise<ITwitterResult<ITweetDTO>>;
//
//   // Favorite Tweet
//   favoriteTweetAsync(parameters: IFavoriteTweetParameters): Promise<ITwitterResult<ITweetDTO>>;
//
//   unfavoriteTweetAsync(parameters: IUnfavoriteTweetParameters): Promise<ITwitterResult<ITweetDTO>>;
//
//   getFavoriteTweetsAsync(parameters: IGetUserFavoriteTweetsParameters): Promise<ITwitterResult<ITweetDTO[]>>;
//
//   getOEmbedTweetAsync(parameters: IGetOEmbedTweetParameters): Promise<ITwitterResult<IOEmbedTweetDTO>>;
// }

@Injectable()
export class TweetQueryExecutorService {

  constructor(private tweetQueryGeneratorService: TweetQueryGeneratorService,
              private postsApi: PostsApi) {
  }

  // public async getTweetAsync(parameters: IGetTweetParameters): Promise<ITweetDTO> {
  //   let params = this.tweetQueryGeneratorService.getTweetQuery(parameters);
  //
  //   return await this.postsApi.getTweetAsync(params)  // this._twitterAccessor.executeRequestAsync<ITweetDTO>(request);
  //       .toPromise()
  //       .then(data => {
  //         return data;
  //       });
  // }
  //
  // public async getTweetsAsync(parameters: IGetTweetsParameters): Promise<ITweetDTO[]> {
  //   let params = this._tweetQueryGenerator.getTweetsQuery(parameters);
  //
  //   return await this.postsApi.getTweetsAsync(params)
  //       .toPromise()
  //       .then(data => {
  //         return data
  //       });
  // }

  public async publishTweetAsync(parameters: IPublishTweetParameters): Promise<ITweetDTO> {
    let params = this.tweetQueryGeneratorService.getPublishTweetQuery(parameters);

    let body = {};
    if (parameters.hasPoll) {
      body = parameters.poll;
    }

    return await this.postsApi.publishTweetAsync(params, body)
        .toPromise()
        .then(data => {
          return data;
        });
  }

  // // Publish Retweet
  // public getRetweetsAsync(parameters: IGetRetweetsParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO[]>> {
  //   let params = this._tweetQueryGenerator.getRetweetsQuery(parameters, new ComputedTweetMode(parameters, request));
  //   request.query.url = query;
  //   request.query.httpMethod = HttpMethod.GET;
  //   return this._twitterAccessor.executeRequestAsync<ITweetDTO[]>(request);
  // }
  //
  // public publishRetweetAsync(parameters: IPublishRetweetParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO>> {
  //   let params = this._tweetQueryGenerator.getPublishRetweetQuery(parameters, new ComputedTweetMode(parameters, request));
  //   request.query.url = query;
  //   request.query.httpMethod = HttpMethod.POST;
  //   return this._twitterAccessor.executeRequestAsync<ITweetDTO>(request);
  // }
  //
  // // Publish UnRetweet
  // public destroyRetweetAsync(parameters: IDestroyRetweetParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO>> {
  //   let params = this._tweetQueryGenerator.getDestroyRetweetQuery(parameters, new ComputedTweetMode(parameters, request));
  //   request.query.url = query;
  //   request.query.httpMethod = HttpMethod.POST;
  //   return this._twitterAccessor.executeRequestAsync<ITweetDTO>(request);
  // }
  //
  // // #region Get Retweeters IDs
  //
  // public getRetweeterIdsAsync(parameters: IGetRetweeterIdsParameters, request: ITwitterRequest): Promise<ITwitterResult<IIdsCursorQueryResultDTO>> {
  //   let params = this._tweetQueryGenerator.getRetweeterIdsQuery(parameters);
  //   return this._twitterAccessor.executeRequestAsync<IIdsCursorQueryResultDTO>(request);
  // }
  //
  // // #endregion;
  //
  // // Destroy Tweet
  // public destroyTweetAsync(parameters: IDestroyTweetParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO>> {
  //   let params = this._tweetQueryGenerator.getDestroyTweetQuery(parameters, new ComputedTweetMode(parameters, request));
  //   request.query.url = query;
  //   request.query.httpMethod = HttpMethod.POST;
  //   return this._twitterAccessor.executeRequestAsync<ITweetDTO>(request);
  // }
  //
  // // Favorite Tweet
  // public getFavoriteTweetsAsync(parameters: IGetUserFavoriteTweetsParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO[]>> {
  //   let params = this._tweetQueryGenerator.getFavoriteTweetsQuery(parameters, new ComputedTweetMode(parameters, request));
  //   request.query.url = query;
  //   request.query.httpMethod = HttpMethod.GET;
  //   return this._twitterAccessor.executeRequestAsync<ITweetDTO[]>(request);
  // }
  //
  // public getOEmbedTweetAsync(parameters: IGetOEmbedTweetParameters, request: ITwitterRequest): Promise<ITwitterResult<IOEmbedTweetDTO>> {
  //   let params = this._tweetQueryGenerator.getOEmbedTweetQuery(parameters);
  //   request.query.url = query;
  //   request.query.httpMethod = HttpMethod.GET;
  //   return this._twitterAccessor.executeRequestAsync<IOEmbedTweetDTO>(request);
  // }
  //
  // public async favoriteTweetAsync(parameters: IFavoriteTweetParameters): Promise<ITweetDTO> {
  //   let params = this.tweetQueryGeneratorService.getCreateFavoriteTweetQuery(parameters);
  //
  //   return await this.postsApi.favoriteTweetAsync(params);
  // }
  //
  // public unfavoriteTweetAsync(parameters: IUnfavoriteTweetParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO>> {
  //   let params = this._tweetQueryGenerator.getUnfavoriteTweetQuery(parameters);
  //   request.query.url = query;
  //   request.query.httpMethod = HttpMethod.POST;
  //   return this._twitterAccessor.executeRequestAsync<ITweetDTO>(request);
  // }
}

﻿import {inject, Inject, Injectable, InjectionToken} from "@angular/core";
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
import {PeerTubeSocket} from "../../core/notification/sharebook-socket.service";
import {UserStore} from "../../core/stores/user.store";
import {objectToFormData} from "../../helpers/utils";
import {catchError} from "rxjs/operators";
import {NbToastrService} from "../../sharebook-nebular/theme/components/toastr/toastr.service";

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
              private postsApi: PostsApi, private socket: PeerTubeSocket,
              private userStore: UserStore, private notifier: NbToastrService) {
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

  public async publishTweetAsync(parameters: IPublishTweetParameters, body: {}): Promise<ITweetDTO> {
    let params = this.tweetQueryGeneratorService.getPublishTweetQuery(parameters);

    const data = objectToFormData(body);

    return await this.postsApi.publishTweetAsync(params, data)
        .toPromise()
        .then(post => {
            this.notifier.success('Your post has been uploaded.', 'Success');
            return post;
        }).catch(err => this.notifier.danger(err.error, 'Error', {duration: 5000}));
  }

  // // Publish Retweet
  // public getRetweetsAsync(parameters: IGetRetweetsParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO[]>> {
  //   let params = this._tweetQueryGenerator.getRetweetsQuery(parameters, new ComputedTweetMode(parameters, request));
  //   request.query.url = query;
  //   request.query.httpMethod = HttpMethod.GET;
  //   return this._twitterAccessor.executeRequestAsync<ITweetDTO[]>(request);
  // }
  //
  public async publishRetweetAsync(parameters: IPublishRetweetParameters): Promise<ITweetDTO> {
    let params = this.tweetQueryGeneratorService.getPublishRetweetQuery(parameters);

    return await this.postsApi.publishRetweetAsync('reshare', params)
      .toPromise()
      .then(data => {
        return data;
      });
  }
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

  // Destroy Tweet
  public async destroyTweetAsync(parameters: IDestroyTweetParameters, unshare = false): Promise<ITweetDTO> {
    let params = this.tweetQueryGeneratorService.getDestroyTweetQuery(parameters);

    let url = 'delete';
    if(unshare) {
      url = 'unshare';
    }

    return await this.postsApi.destroyTweetAsync(url, params)
      .toPromise()
      .then(data => {
        return data;
      });
  }

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

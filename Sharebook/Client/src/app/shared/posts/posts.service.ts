import {Injectable} from "@angular/core";
import {catchError, map, switchMap} from "rxjs/operators";

import {GetTweetParameters, IGetTweetParameters} from "./parameters/get-tweet-parameters";
import {IPost} from "./models/tweet";
import {GetTweetsParameters, IGetTweetsParameters} from "./parameters/get-tweets-parameters";
import {IPublishTweetParameters, PublishTweetParameters} from "./parameters/publish-tweet-parameters";
import {DestroyTweetParameters, IDestroyTweetParameters} from "./parameters/destroy-tweet-parameters";
import {ITweetIdentifier} from "./models/tweet-identifier";
import {GetRetweetsParameters, IGetRetweetsParameters} from "./parameters/get-retweets-parameters";
import {IPublishRetweetParameters, PublishRetweetParameters} from "./parameters/publish-retweet-parameters";
import {DestroyRetweetParameters, IDestroyRetweetParameters} from "./parameters/destroy-retweet-parameters";
import {GetRetweeterIdsParameters, IGetRetweeterIdsParameters} from "./parameters/get-retweeter-ids-parameters";
import {
  GetUserFavoriteTweetsParameters,
  IGetUserFavoriteTweetsParameters
} from "./parameters/get-favorite-tweets-Parameters";
import {IUserIdentifier} from "../models/user/user-identifier";
import {FavoriteTweetParameters, IFavoriteTweetParameters} from "./parameters/favorite-tweet-parameters";
import {IUnfavoriteTweetParameters, UnfavoriteTweetParameters} from "./parameters/unfavorite-tweet-parameters";
import {GetOEmbedTweetParameters, IGetOEmbedTweetParameters} from "./parameters/get-OEmbed-tweet-parameters";
import {TweetsRequesterService} from "./tweets-requester.service";
import {ITweetDTO} from "./models/DTO/tweet-dto";
import {ITweetsClientParametersValidator} from "./validators/tweets-client-parameters-validator";
import {UserVideoRateType} from "./models/rate/user-video-rate.type";
import {UserVideoRateUpdate} from "./models/rate/user-video-rate-update.model";
import {TweetQueryGeneratorService} from "./tweet-query-generator.service";
import {PostsApi} from "./backend/posts.api";
import {RestExtractor} from "../../core/rest/rest-extractor";
import {ResultList} from "../models";
import {Post} from "../shared-main/post/post.model";
import {GetHomeTimelineParameters} from "../models/timeline/get-home-timeline-parameters";
import {HttpParams} from "@angular/common/http";
import {RestService} from "../../core/rest/rest.service";
import {TimelineApi} from "../timeline/backend/timeline.api";
import {Observable} from "rxjs";

@Injectable()
export class PostsService {
  constructor(private tweetQueryGeneratorService: TweetQueryGeneratorService,
              private postsApi: PostsApi,
              private restExtractor: RestExtractor,
              private restService: RestService,
              private timelineApi: TimelineApi,
              private tweetsRequesterService?: TweetsRequesterService) {
  }

  // get parametersValidator(): ITweetsClientParametersValidator {
  //     return this._client.parametersValidator;
  // }

  // Tweets

  // public async getTweetAsync(tweetIdOrParameters: number | IGetTweetParameters): Promise<ITweet> {
  //     let parameters: IGetTweetParameters;
  //     if (this.isIGetTweetParameters(tweetIdOrParameters)) {
  //         parameters = tweetIdOrParameters;
  //     } else {
  //         parameters = new GetTweetParameters(tweetIdOrParameters);
  //     }
  //
  //     let twitterResult = await this.tweetsRequesterService.getTweetAsync(parameters);
  //     return twitterResult;
  //     // return this._client.factories.createTweet(twitterResult?.model);
  // }

  // public async getTweetsAsync(tweetIdsOrTweetsOrParameters: number[] | ITweetIdentifier[] | IGetTweetsParameters): Promise<ITweet[]> {
  //     let parameters: IGetTweetsParameters;
  //     if (this.isIGetTweetsParameters(tweetIdsOrTweetsOrParameters)) {
  //         parameters = tweetIdsOrTweetsOrParameters;
  //     } else {
  //         parameters = new GetTweetsParameters(tweetIdsOrTweetsOrParameters);
  //     }
  //
  //     if (parameters.tweets == null || parameters.tweets.length === 0) {
  //         return new Array<ITweet>(0);    // new Tweet[0];
  //     }
  //
  //     let requestResult = await this.tweetsRequesterService.getTweetsAsync(parameters);
  //     return requestResult;
  //     // return this._client.factories.createTweets(requestResult?.model);
  // }


  // Tweets - Publish

  public async publishTweetAsync(textOrParameters: string | IPublishTweetParameters): Promise<IPost> {
    let parameters: IPublishTweetParameters;
    if (this.isIPublishTweetParameters(textOrParameters)) {
      parameters = textOrParameters;
    } else {
      parameters = new PublishTweetParameters(textOrParameters);
    }

    let requestResult = await this.tweetsRequesterService.publishTweetAsync(parameters);
    return null;

    // return this._client.factories.createTweet(requestResult?.model);
  }

  // // Tweets - Destroy
  //
  // public async destroyTweetAsync(tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters: number
  //     | ITweetIdentifier | ITweet | ITweetDTO | IDestroyTweetParameters): Promise<void> {
  //     let parameters: IDestroyTweetParameters;
  //     if (this.isIDestroyTweetParameters(tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters)) {
  //         parameters = tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters;
  //     } else if (this.isTweet(tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters)) {
  //         parameters = new DestroyTweetParameters(tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters.tweetDTO); // .ConfigureAwait(false);
  //     } else {
  //         parameters = new DestroyTweetParameters(tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters);
  //     }
  //
  //     await this.tweetsRequesterService.destroyTweetAsync(parameters); // .ConfigureAwait(false);
  // }
  //
  // // Retweets
  //
  // public async getRetweetsAsync(tweetIdOrTweetIdentifierOrParameters: number | ITweetIdentifier | IGetRetweetsParameters): Promise<ITweet[]> {
  //     let parameters: IGetRetweetsParameters;
  //     if (this.isIGetRetweetsParameters(tweetIdOrTweetIdentifierOrParameters)) {
  //         parameters = tweetIdOrTweetIdentifierOrParameters;
  //     } else {
  //         parameters = new GetRetweetsParameters(tweetIdOrTweetIdentifierOrParameters);
  //     }
  //
  //     let requestResult = await this.tweetsRequesterService.getRetweetsAsync(parameters); // .ConfigureAwait(false);
  //     return this._client.factories.createTweets(requestResult?.model);
  // }
  //
  // public async publishRetweetAsync(tweetIdOrTweetIdentifierOrParameters: number | ITweetIdentifier | IPublishRetweetParameters): Promise<ITweet> {
  //     let parameters: IPublishRetweetParameters;
  //     if (this.isIPublishRetweetParameters(tweetIdOrTweetIdentifierOrParameters)) {
  //         parameters = tweetIdOrTweetIdentifierOrParameters;
  //     } else {
  //         parameters = new PublishRetweetParameters(tweetIdOrTweetIdentifierOrParameters);
  //     }
  //
  //     let requestResult = await this.tweetsRequesterService.gublishRetweetAsync(parameters); // .ConfigureAwait(false);
  //     return this._client.factories.createTweet(requestResult?.model);
  // }
  //
  // public async destroyRetweetAsync(retweetIdOrTweetIdentifierOrParameters: number | ITweetIdentifier | IDestroyRetweetParameters): Promise<void> {
  //     let parameters: IDestroyRetweetParameters;
  //     if (this.isIDestroyRetweetParameters(retweetIdOrTweetIdentifierOrParameters)) {
  //         parameters = retweetIdOrTweetIdentifierOrParameters;
  //     } else {
  //         parameters = new DestroyRetweetParameters(retweetIdOrTweetIdentifierOrParameters);
  //     }
  //
  //     await this.tweetsRequesterService.destroyRetweetAsync(parameters);
  // }
  //
  // public async getRetweeterIdsAsync(tweetIdOrTweetIdentifierOrParametersOr: number | ITweetIdentifier | IGetRetweeterIdsParameters): Promise<number[]> {
  //     let parameters: IGetRetweeterIdsParameters;
  //     if (this.isIGetRetweeterIdsParameters(tweetIdOrTweetIdentifierOrParametersOr)) {
  //         parameters = tweetIdOrTweetIdentifierOrParametersOr;
  //     } else {
  //         parameters = new GetRetweeterIdsParameters(tweetIdOrTweetIdentifierOrParametersOr);
  //     }
  //
  //     let iterator = this.getRetweeterIdsIterator(parameters);
  //     return [...(await iterator.nextPageAsync())];
  // }
  //
  // public getRetweeterIdsIterator(tweetIdOrTweetIdentifierOrParameters: number | ITweetIdentifier | IGetRetweeterIdsParameters): ITwitterIterator<number> {
  //     let parameters: IGetRetweeterIdsParameters;
  //     if (this.isIGetRetweeterIdsParameters(tweetIdOrTweetIdentifierOrParameters)) {
  //         parameters = tweetIdOrTweetIdentifierOrParameters;
  //     } else {
  //         parameters = new GetRetweeterIdsParameters(tweetIdOrTweetIdentifierOrParameters);
  //     }
  //
  //     let twitterResultIterator = this.tweetsRequesterService.getRetweeterIdsIterator(parameters);
  //     return new TwitterIteratorProxy<ITwitterResult<IIdsCursorQueryResultDTO>, number>(twitterResultIterator, dto => dto.model.ids);
  // }
  //
  // public async getUserFavoriteTweetsAsync(userIdOrUsernameOrUserIdentifierOrParameters: number | string
  //     | IUserIdentifier | IGetUserFavoriteTweetsParameters): Promise<ITweet[]> {
  //     let parameters: IGetUserFavoriteTweetsParameters;
  //     if (this.isIGetUserFavoriteTweetsParameters(userIdOrUsernameOrUserIdentifierOrParameters)) {
  //         parameters = userIdOrUsernameOrUserIdentifierOrParameters;
  //     } else {
  //         parameters = new GetUserFavoriteTweetsParameters(userIdOrUsernameOrUserIdentifierOrParameters);
  //     }
  //
  //     let iterator = this.getUserFavoriteTweetsIterator(parameters);
  //     return [...(await iterator.nextPageAsync())]; // .ConfigureAwait(false)).ToArray();
  // }
  //
  // // #region Favorite Tweets
  // public getUserFavoriteTweetsIterator(userIdOrUsernameOrUserIdentifierOrParameters: number | string
  //     | IUserIdentifier | IGetUserFavoriteTweetsParameters): ITwitterIterator<ITweet, number> {   // long?
  //     let parameters: IGetUserFavoriteTweetsParameters;
  //     if (this.isIGetUserFavoriteTweetsParameters(userIdOrUsernameOrUserIdentifierOrParameters)) {
  //         parameters = userIdOrUsernameOrUserIdentifierOrParameters;
  //     } else {
  //         parameters = new GetUserFavoriteTweetsParameters(userIdOrUsernameOrUserIdentifierOrParameters);
  //     }
  //
  //     let favoriteTweetsIterator = this.tweetsRequesterService.getUserFavoriteTweetsIterator(parameters);
  //     return new TwitterIteratorProxy<ITwitterResult<ITweetDTO[]>, ITweet, number>(favoriteTweetsIterator,            // long?
  //         twitterResult => {
  //             return twitterResult.model.map(x => this._client.factories.createTweet(x));
  //         });
  // }
  //
  // public async favoriteTweetAsync(postId: number): Promise<void> {
  //   let parameters: IFavoriteTweetParameters = new FavoriteTweetParameters(postId);
  //
  //   await this.tweetsRequesterService.favoriteTweetAsync(parameters);
  // }

  setVideoLike(id: number) {
    return this.setVideoRate(id, 'like');
  }

  setVideoDislike(id: number) {
    return this.setVideoRate(id, 'dislike');
  }

  unsetVideoLike(id: number) {
    return this.setVideoRate(id, 'none');
  }


  //
  // public async unfavoriteTweetAsync(tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters: number
  //     | ITweetIdentifier | ITweet | ITweetDTO | IUnfavoriteTweetParameters): Promise<void> {
  //     let parameters: IUnfavoriteTweetParameters;
  //     if (this.isIUnfavoriteTweetParameters(tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters)) {
  //         parameters = tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters;
  //     } else if (this.isTweet(tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters) || this.isTweetDTO(tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters)) {
  //         let tweetDTOCurrent: ITweetDTO;
  //         if (this.isTweet(tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters)) {
  //             tweetDTOCurrent = tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters.tweetDTO;
  //         } else {
  //             tweetDTOCurrent = tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters;
  //         }
  //
  //         parameters = new UnfavoriteTweetParameters(tweetDTOCurrent);
  //         await this.tweetsRequesterService.unfavoriteTweetAsync(parameters); // .ConfigureAwait(false);
  //         tweetDTOCurrent.favorited = false;
  //
  //         return;
  //     } else {
  //         parameters = new DestroyTweetParameters(tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters);
  //     }
  //
  //     await this.tweetsRequesterService.unfavoriteTweetAsync(parameters); // .ConfigureAwait(false);
  // }
  //
  // public async getOEmbedTweetAsync(tweetIdOrTweetIdentifierOrParameters: number | ITweetIdentifier | IGetOEmbedTweetParameters): Promise<IOEmbedTweet> {
  //     let parameters: IGetOEmbedTweetParameters;
  //     if (this.isIGetOEmbedTweetParameters(tweetIdOrTweetIdentifierOrParameters)) {
  //         parameters = tweetIdOrTweetIdentifierOrParameters;
  //     } else {
  //         parameters = new GetOEmbedTweetParameters(tweetIdOrTweetIdentifierOrParameters);
  //     }
  //
  //     let twitterResult = await this.tweetsRequesterService.getOEmbedTweetAsync(parameters); // .ConfigureAwait(false);
  //     return this._client.factories.createOEmbedTweet(twitterResult?.model);
  // }

  // 04.02.2021, Thursday, 10:40 AM | Dark Space Ambient - Abandoned Space Station

  getMyPosts() {

  }

  getUserPosts() {

  }

  getPosts() {

  }

  getHomeTimelinePosts(parameters: GetHomeTimelineParameters) {
    const { postPagination, sort, skipCount } = parameters;

    const pagination = this.restService.componentPaginationToRestPagination(postPagination);

    let params = new HttpParams();

    params = this.restService.addRestGetParams(params, pagination, sort);

    params = this.restService.addParameterToQuery(params, "exclude_replies", parameters.excludeReplies);
    params = this.restService.addParameterToQuery(params, "skip_count", skipCount.toString());
    params = this.restService.addFormattedParameterToQuery(params, parameters.formattedCustomQueryParameters);

    return this.timelineApi.getHomeTimelineAsync(params);
      // .pipe(                    // @ts-ignore
      //   switchMap(res => this.extractVideos(res)),                  // switchMap might bug
      //   catchError(err => this.restExtractor.handleError(err))
      // );
  }

  extractVideos(result: ResultList<Post>) {
    debugger
    const postsJson = result.data;
    const totalPosts = result.total;
    const posts: Post[] = [];

    for (const postJson of postsJson) {
      posts.push(new Post(postJson));
    }

    return {total: totalPosts, data: posts};
  }

  private setVideoRate(id: number, rateType: UserVideoRateType) {
    let isUp = (rateType === 'like');
    let params = this.tweetQueryGeneratorService.getCreateFavoriteTweetQuery(new FavoriteTweetParameters(id, isUp));

    return this.postsApi.votePostAsync(params)
      .pipe(
        map(this.restExtractor.extractDataBool),
        catchError(err => this.restExtractor.handleError(err))
      );
  }

  // #endregion

  private isIGetTweetParameters(tweetIdOrParameters: number | IGetTweetParameters): tweetIdOrParameters is IGetTweetParameters {
    return (tweetIdOrParameters as IGetTweetParameters).includeCardUri !== undefined;
  }

  private isIGetTweetsParameters(tweetIdsOrTweetsOrParameters: number[] | ITweetIdentifier[] | IGetTweetsParameters): tweetIdsOrTweetsOrParameters is IGetTweetsParameters {
    return (tweetIdsOrTweetsOrParameters as IGetTweetsParameters).includeCardUri !== undefined;
  }

  private isIPublishTweetParameters(textOrParameters: string | IPublishTweetParameters): textOrParameters is IPublishTweetParameters {
    return (textOrParameters as IPublishTweetParameters).medias !== undefined;
  }

  private isTweet(tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters: any): tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters is IPost {
    return (tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters as IPost).contributors !== undefined;
  }

  private isTweetDTO(tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters: any): tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters is ITweetDTO {
    return (tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters as ITweetDTO).contributors !== undefined;
  }

  private isIDestroyTweetParameters(tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters: number
    | ITweetIdentifier | IPost | ITweetDTO | IDestroyTweetParameters): tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters is IDestroyTweetParameters {
    return (tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters as IDestroyTweetParameters).tweet !== undefined;
  }

  private isIGetRetweetsParameters(tweetIdOrTweetIdentifierOrParameters: number | ITweetIdentifier | IGetRetweetsParameters): tweetIdOrTweetIdentifierOrParameters is IGetRetweetsParameters {
    return (tweetIdOrTweetIdentifierOrParameters as IGetRetweetsParameters).pageSize !== undefined;
  }

  private isIPublishRetweetParameters(tweetIdOrTweetIdentifierOrParameters: number | ITweetIdentifier | IPublishRetweetParameters):
    tweetIdOrTweetIdentifierOrParameters is IPublishRetweetParameters {
    return (tweetIdOrTweetIdentifierOrParameters as IPublishRetweetParameters).trimUser !== undefined;
  }

  private isIDestroyRetweetParameters(retweetIdOrTweetIdentifierOrParameters: number | ITweetIdentifier | IDestroyRetweetParameters):
    retweetIdOrTweetIdentifierOrParameters is IDestroyRetweetParameters {
    return (retweetIdOrTweetIdentifierOrParameters as IDestroyRetweetParameters).trimUser !== undefined;
  }

  private isIGetRetweeterIdsParameters(tweetIdOrTweetIdentifierOrParametersOr: number | ITweetIdentifier | IGetRetweeterIdsParameters):
    tweetIdOrTweetIdentifierOrParametersOr is IGetRetweeterIdsParameters {
    return (tweetIdOrTweetIdentifierOrParametersOr as IGetRetweeterIdsParameters).tweet !== undefined;
  }

  private isIGetUserFavoriteTweetsParameters(userIdOrUsernameOrUserIdentifierOrParameters: number | string
    | IUserIdentifier | IGetUserFavoriteTweetsParameters): userIdOrUsernameOrUserIdentifierOrParameters is IGetUserFavoriteTweetsParameters {
    return (userIdOrUsernameOrUserIdentifierOrParameters as IGetUserFavoriteTweetsParameters).user !== undefined;
  }

  private isIFavoriteTweetParameters(tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters: number
    | ITweetIdentifier | IPost | ITweetDTO | IFavoriteTweetParameters): tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters is IFavoriteTweetParameters {
    return (tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters as IFavoriteTweetParameters).includeEntities !== undefined;
  }

  private isIUnfavoriteTweetParameters(tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters: any): tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters is IUnfavoriteTweetParameters {
    return (tweetIdOrTweetIdentifierOrTweetOrTweetDTOOrParameters as IUnfavoriteTweetParameters).includeEntities !== undefined;
  }

  private isIGetOEmbedTweetParameters(tweetIdOrTweetIdentifierOrParameters: any): tweetIdOrTweetIdentifierOrParameters is IGetOEmbedTweetParameters {
    return (tweetIdOrTweetIdentifierOrParameters as IGetOEmbedTweetParameters).alignment !== undefined;
  }
}

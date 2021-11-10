import {Injectable} from "@angular/core";
import {catchError, map, switchMap} from "rxjs/operators";

import {GetTweetParameters, IGetTweetParameters} from "./parameters/get-tweet-parameters";
import {IPost} from "./models/post.model";
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
import {IUserIdentifier} from "../models/users/user-identifier";
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
import {Observable, of as observableOf} from "rxjs";
import {UserVideoRate} from "./models/rate/user-video-rate.model";
import {IPostConstant} from "./models/post-constant.model";
import {PostPrivacy} from "../models/enums/post-privacy";
import {PostDetails} from "../shared-main/post/post-details.model";
import {ComponentPaginationLight} from "../../core/rest/component-pagination.model";
import {PostSortField} from "./models/post-sort-field.type";
import {PostFilter} from "./models/post-query.type";
import {User} from "../shared-main/user/user.model";
import {GetUserTimelineParameters, IGetUserTimelineParameters} from "../models/timeline/get-user-timeline-parameters";
import {UserQueryParameterGeneratorService} from "../services/user-query-parameter-generator.service";
import {IMediaEntity} from "../post-object/Entities/interfaces/IMediaEntity";
import {HttpService} from "../../core/backend/common/api/http.service";

@Injectable()
export class PostsService {
  constructor(private tweetQueryGeneratorService: TweetQueryGeneratorService,
              private postsApi: PostsApi,
              private restExtractor: RestExtractor,
              private restService: RestService,
              private timelineApi: TimelineApi,
              private authHttp: HttpService,
              private userQueryParameterGeneratorService: UserQueryParameterGeneratorService,
              private tweetsRequesterService?: TweetsRequesterService,
  ) {
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

  public async publishTweetAsync(textOrParameters: string | IPublishTweetParameters, body: {}): Promise<IPost> {
    let parameters: IPublishTweetParameters;
    if (this.isIPublishTweetParameters(textOrParameters)) {
      parameters = textOrParameters;
    } else {
      parameters = new PublishTweetParameters(textOrParameters);
    }

    let requestResult = await this.tweetsRequesterService.publishTweetAsync(parameters, body);
    return null;

    // return this._client.factories.createTweet(requestResult?.model);
  }

  getPost(videoId: string): Observable<PostDetails> {
    // return this.serverService.getServerLocale()
    //   .pipe(
    //     switchMap(translations => {
    //       return this.authHttp.get<PostDetails>(VideoService.BASE_VIDEO_URL + options.videoId)
    //     //   .pipe(map(videoHash => ({ videoHash, translations })))
    //     }),
    //     map(({ videoHash, translations }) => new VideoDetails(videoHash, translations)),
    //     catchError(err => this.restExtractor.handleError(err))
    //   );

    return this.postsApi.getPost(videoId)
      .pipe(map(videoHash => ({videoHash})))
      .pipe(map(({videoHash}) => new PostDetails(videoHash)),
        catchError(err => this.restExtractor.handleError(err)));


  }

  // Tweets - Destroy

  public async destroyTweetAsync(postId: number | ITweetIdentifier, unshare = false): Promise<any> {
    let parameters = new DestroyTweetParameters(postId);

    return await this.tweetsRequesterService.destroyTweetAsync(parameters, unshare); // .ConfigureAwait(false);
  }


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
  public async publishRetweetAsync(tweetIdOrTweetIdentifierOrParameters: number | ITweetIdentifier | IPublishRetweetParameters): Promise<IPost> {

    let parameters: IPublishRetweetParameters;
    if (this.isIPublishRetweetParameters(tweetIdOrTweetIdentifierOrParameters)) {
      parameters = tweetIdOrTweetIdentifierOrParameters;
    } else {
      parameters = new PublishRetweetParameters(tweetIdOrTweetIdentifierOrParameters);
    }

    let requestResult = await this.tweetsRequesterService.publishRetweetAsync(parameters);
    return null;
  }

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

  getProfilePosts(parameters: {
    user: User,
    videoPagination: ComponentPaginationLight,
    sort: PostSortField
    videoFilter?: PostFilter
    search?: string
  }): Observable<ResultList<Post>> {
    const {user, videoPagination, sort, videoFilter, search} = parameters;

    const pagination = this.restService.componentPaginationToRestPagination(videoPagination);

    let params = new HttpParams();
    params = this.restService.addRestGetParams(params, pagination, sort);

    if (videoFilter) {
      params = params.set('filter', videoFilter);
    }

    if (search) {
      params = params.set('search', search);
    }

    let url = user.screenName + '/posts';

    return this.postsApi.getProfilePosts<ResultList<Post>>(url, params)
      .pipe(
        switchMap(res => this.extractVideos(res)),
        catchError(err => this.restExtractor.handleError(err))
      );
  }

  getPosts() {

  }

  getHomeTimelinePosts(parameters: GetHomeTimelineParameters) {
    const {postPagination, sort, skipCount} = parameters;

    const pagination = this.restService.componentPaginationToRestPagination(postPagination);

    let params = new HttpParams();

    params = this.restService.addRestGetParams(params, pagination, sort);

    params = this.restService.addParameterToQuery(params, "exclude_replies", parameters.excludeReplies);
    params = this.restService.addParameterToQuery(params, "skip_count", skipCount.toString());
    params = this.restService.addFormattedParameterToQuery(params, parameters.formattedCustomQueryParameters);

    return this.timelineApi.getHomeTimelineAsync(params)
      .pipe(// @ts-ignore
        switchMap(res => this.extractVideos(res)),                  // switchMap might bug
        catchError(err => this.restExtractor.handleError(err))
      );
  }

  getUserTimelineQuery(parameters: {
    videoPagination: ComponentPaginationLight,
    sort: PostSortField,
    skipCount?: boolean,
    userId: number,
  }): Observable<ResultList<Post>> {
    const {videoPagination, sort, skipCount, userId} = parameters;

    const pagination = this.restService.componentPaginationToRestPagination(videoPagination);

    let params = new HttpParams();

    params = this.restService.addRestGetParams(params, pagination, sort);

    // params = this.restService.addFormattedParameterToQuery(params, this.userQueryParameterGeneratorService.generateIdOrScreenNameParameter(parameters.user));

    // this._queryParameterGenerator.addTimelineParameters(query, parameters, tweetMode);

    params = this.restService.addParameterToQuery(params, "userId", userId.toString());
    params = this.restService.addParameterToQuery(params, "excludeReplies", 'false');
    params = this.restService.addParameterToQuery(params, "includeRts", 'true');
    // params = this.restService.addFormattedParameterToQuery(params, parameters.formattedCustomQueryParameters);

    return this.timelineApi.getUserTimelineAsync(params)
      .pipe(
        switchMap(res => this.extractVideos(res)),
        catchError(err => this.restExtractor.handleError(err))
      );
  }

  extractVideos(result: ResultList<Post>) {
    const postsJson = result.data;
    const totalPosts = result.total;
    const posts: Post[] = [];

    for (const postJson of postsJson) {
      posts.push(new Post(postJson));
    }

    return observableOf({total: totalPosts, data: posts});
  }

  removePost(id: number) {
    const url = `${id}`;

    return this.postsApi.removePost(url)
      .pipe(
        map(this.restExtractor.extractDataBool),
        catchError(err => this.restExtractor.handleError(err))
      );
  }

  getUserVideoRating(id: number) {
    const url = 'users/me/posts/' + id + '/rating';

    return this.postsApi.getUserVideoRating(url)
      .pipe(catchError(err => this.restExtractor.handleError(err)));
  }

  private setVideoRate(id: number, rateType: UserVideoRateType) {
    const url = 'vote/' + id;
    const body: UserVideoRateUpdate = {
      rating: rateType
    };

    return this.authHttp
      .put(url, body)
      .pipe(
        map(this.restExtractor.extractDataBool),
        catchError(err => this.restExtractor.handleError(err))
      );
  }


  explainedPrivacyLabels(serverPrivacies?: IPostConstant<PostPrivacy>[], defaultPrivacyId = PostPrivacy.PUBLIC) {
    const descriptions = {
      [PostPrivacy.PRIVATE]: `Only I can see this video`,
      /*[PostPrivacy.UNLISTED]: `Only shareable via a private link`,*/
      [PostPrivacy.PUBLIC]: `Anyone can see this video`,
      /*[PostPrivacy.INTERNAL]: `Only users of this instance can see this video`*/
    };

    const videoPrivacies = serverPrivacies.map(p => {
      return {
        ...p,

        description: descriptions[p.id]
      };
    });

    return {
      videoPrivacies,
      defaultPrivacyId: serverPrivacies.find(p => p.id === defaultPrivacyId)?.id || serverPrivacies[0].id
    };

  }

  getHighestAvailablePrivacy(serverPrivacies: IPostConstant<PostPrivacy>[]) {
    const order = [PostPrivacy.PRIVATE, PostPrivacy.PUBLIC];

    for (const privacy of order) {
      if (serverPrivacies.find(p => p.id === privacy)) {
        return privacy;
      }
    }

    throw new Error('No highest privacy available');
  }

  getLikers(postId: number) {
    let url = `likers/${postId}`;

    return this.postsApi.getLikers(url)
      .pipe(catchError(err => this.restExtractor.handleError(err)));
  }

  getPostPhotos(postId: number): Observable<IMediaEntity[]> {
    let url = `post/${postId}/photo`;

    return this.postsApi.getPostPhotos(url)
      .pipe(catchError(err => this.restExtractor.handleError(err)));
  }

  pinPost(postId: number) {
    let url = 'pin/' + postId;

    return this.postsApi.pinPost(url)
      .pipe(catchError(err => this.restExtractor.handleError(err)));
  }

  unpinPost(postId: number) {
    let url = 'unpin/' + postId;

    return this.postsApi.unpinPost(url)
      .pipe(catchError(err => this.restExtractor.handleError(err)));
  }

  getPinnedPost(userId: number) {
    let url = 'pinned/' + userId;

    return this.postsApi.getPinnedPost(url)
      .pipe(catchError(err => this.restExtractor.handleError(err)));
  }

  repost(postId: number) {
    let url = postId + '/repost';

    return this.postsApi.repost(url)
      .pipe(catchError(err => this.restExtractor.handleError(err)));
  }

  unrepost(postId: number) {
    let url = postId + '/unrepost';

    return this.postsApi.unrepost(url)
      .pipe(catchError(err => this.restExtractor.handleError(err)));
  }

  getReposters(postId: number) {
    let url = `reposters/${postId}`;

    return this.postsApi.getReposters(url)
      .pipe(catchError(err => this.restExtractor.handleError(err)));
  }

  deletePost(postId: number) {
    let url = `delete/${postId}`;

    return this.postsApi.deletePost(url)
      .pipe(catchError(err => this.restExtractor.handleError(err)));
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

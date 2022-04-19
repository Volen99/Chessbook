import {Injectable} from "@angular/core";
import {catchError, map, switchMap} from "rxjs/operators";
import {HttpParams} from "@angular/common/http";

import {UserVideoRateType} from "./models/rate/user-video-rate.type";
import {UserVideoRateUpdate} from "./models/rate/user-video-rate-update.model";
import {PostsApi} from "./backend/posts.api";
import {RestExtractor} from "../../core/rest/rest-extractor";
import {ResultList} from "../models";
import {Post} from "../shared-main/post/post.model";
import {RestService} from "../../core/rest/rest.service";
import {TimelineApi} from "../timeline/backend/timeline.api";
import {Observable, of as observableOf} from "rxjs";
import {IPostConstant} from "./models/post-constant.model";
import {PostPrivacy} from "../models/enums/post-privacy";
import {PostDetails} from "../shared-main/post/post-details.model";
import {ComponentPaginationLight} from "../../core/rest/component-pagination.model";
import {PostSortField} from "./models/post-sort-field.type";
import {PostFilter} from "./models/post-query.type";
import {User} from "../shared-main/user/user.model";
import {IMediaEntity} from "../post-object/Entities/interfaces/IMediaEntity";
import {HttpService} from "../../core/backend/common/api/http.service";
import {
  IPublishTweetParameters,
  PublishTweetParameters
} from '../../pages/modal-overlays/dialog/compose/upload/upload.component';
import {IPost} from './models/post.model';
import {objectToFormData} from '../../helpers/utils';
import {NbToastrService} from '../../sharebook-nebular/theme/components/toastr/toastr.service';
import {NbGlobalPhysicalPosition} from "../../sharebook-nebular/theme/components/cdk/overlay/position-helper";

@Injectable()
export class PostsService {
  constructor(
              private postsApi: PostsApi,
              private restExtractor: RestExtractor,
              private restService: RestService,
              private timelineApi: TimelineApi,
              private authHttp: HttpService,
              private notifier: NbToastrService) {
  }

  public async publishTweetAsync(textOrParameters: IPublishTweetParameters, body: {}) {
    let parameters = textOrParameters;
    // @ts-ignore
    parameters.mediaIds = parameters.mediaIds.concat(parameters.medias.map(x => x.mediaId));

    let params = this.getPublishTweetQuery(parameters);

    const data = objectToFormData(body);

    return this.postsApi.publishTweetAsync(params, data)
      .subscribe((post: Post) => {
        let url = Post.buildWatchUrl(post);
        this.notifier.success('View', 'Your post has been uploaded.',
            {
              position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
              duration: 6000,
            }, url);
      }, err => this.notifier.danger(err.error, 'Error', {duration: 5000}));
  }

  private getPublishTweetQuery(parameters: IPublishTweetParameters): HttpParams {
    let text = parameters.text;

    let attachmentUrl = parameters.quotedTweetUrl;

    let params = new HttpParams();

    params = this.restService.addParameterToQuery(params, "status", text);
    params = this.restService.addParameterToQuery(params, "auto_populate_reply_metadata", parameters.autoPopulateReplyMetadata);
    params = this.restService.addParameterToQuery(params, "attachment_url", attachmentUrl);
    params = this.restService.addParameterToQuery(params, "card_uri", parameters.cardUri);
    params = this.restService.addParameterToQuery(params, "display_coordinates", parameters.displayExactCoordinates);

    if (parameters.excludeReplyUserIds != null) {
      params = this.restService.addParameterToQuery(params, "exclude_reply_user_ids", parameters.excludeReplyUserIds.join(',')); // string.Join(",", parameters.excludeReplyUserIds));
    }

    if (parameters.mediaIds.length > 0) {
      // let mediaIdsParameter = parameters.mediaIds.map(x => x.toString(/*CultureInfo.InvariantCulture*/)).join(', ');
      let media_ids = parameters.mediaIds.map(x => x.toString());
      // params = this.restService.addParameterToQuery(params, "media_ids", mediaIdsParameter);
      params = this.restService.addObjectParams(params, { media_ids });
    }

    params = this.restService.addParameterToQuery(params, "place_id", parameters.placeId);
    params = this.restService.addParameterToQuery(params, "possibly_sensitive", parameters.possiblySensitive);
    params = this.restService.addParameterToQuery(params, "trim_user", parameters.trimUser);
    // params = this.restService.addParameterToQuery(params, "tweet_mode", tweetMode);

    // params = this.restService.addFormattedParameterToQuery(params, parameters.formattedCustomQueryParameters);


    // for poll
    if (parameters.hasPoll) {
      params = this.restService.addParameterToQuery(params, 'has_poll', 'true');
    }

    return params;
  }

  getPost(videoId: string): Observable<PostDetails> {
    return this.postsApi.getPost(videoId)
      .pipe(map(videoHash => ({videoHash})))
      .pipe(map(({videoHash}) => new PostDetails(videoHash)),
        catchError(err => this.restExtractor.handleError(err)));
  }

  setVideoLike(id: number) {
    return this.setVideoRate(id, 'like');
  }

  setVideoDislike(id: number) {
    return this.setVideoRate(id, 'dislike');
  }

  unsetVideoLike(id: number) {
    return this.setVideoRate(id, 'none');
  }

  // 04.02.2021, Thursday, 10:40 AM | Dark Space Ambient - Abandoned Space Station

  getMyPosts() {

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

  deletePost(postId: number, isAdmin = false) {
    let url = `delete/${postId}`;

    return this.postsApi.deletePost(url, isAdmin)
      .pipe(catchError(err => this.restExtractor.handleError(err)));
  }

  // #endregion
}

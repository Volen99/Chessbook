import {Injectable} from "@angular/core";
import {HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

import {HttpService} from "../../../core/backend/common/api/http.service";
import {IPublishRetweetParameters} from "../parameters/publish-retweet-parameters";
import {IDestroyRetweetParameters} from "../parameters/destroy-retweet-parameters";
import {IGetRetweetsParameters} from "../parameters/get-retweets-parameters";
import {IGetRetweeterIdsParameters} from "../parameters/get-retweeter-ids-parameters";
import {IDestroyTweetParameters} from "../parameters/destroy-tweet-parameters";
import {IFavoriteTweetParameters} from "../parameters/favorite-tweet-parameters";
import {IUnfavoriteTweetParameters} from "../parameters/unfavorite-tweet-parameters";
import {IGetUserFavoriteTweetsParameters} from "../parameters/get-favorite-tweets-Parameters";
import {IGetOEmbedTweetParameters} from "../parameters/get-OEmbed-tweet-parameters";
import {UserVideoRate} from "../models/rate/user-video-rate.model";
import {PostDetails} from "../../shared-main/post/post-details.model";

@Injectable()
export class PostsApi {
    private readonly apiController: string = 'posts';
    private readonly voteApiController: string = 'vote';

    constructor(private api: HttpService) {
    }

    getTweetAsync(params: HttpParams): Observable<any> { // Promise<ITwitterResult<ITweetDTO>>;
        return this.api.get(this.apiController, {params}); // '{ params }' omg I want to kill myself! 11.04.2021, Sunday, 16:18 | Cigarettes After Sex - Falling in Love (lyrics) I 1 Hour Loop
    }

    getPost(id): Observable<any> {
        return this.api.get(`${this.apiController}/${id}`);
    }

    getTweetsAsync(params: HttpParams): Observable<any[]> {
        return this.api.get(this.apiController, {params});
    }

    publishTweetAsync(params: HttpParams, body?: {}): Observable<any> {
        return this.api.post(this.apiController, body, {params});
    }

    getUserVideoRating(url: string) {
        return this.api.get<UserVideoRate>(url);
    }

    removePost(url: string) {
        return this.api.delete(`${this.apiController}/${url}`);
    }

    getProfilePosts<T>(url: string, params: HttpParams) {
        return this.api.get(`${this.apiController}/${url}`, {params});
    }


    // // Publish Retweet
    // publishRetweetAsync(parameters: IPublishRetweetParameters): Promise<ITwitterResult<ITweetDTO>>;
    //
    // // UnRetweet
    // destroyRetweetAsync(parameters: IDestroyRetweetParameters): Promise<ITwitterResult<ITweetDTO>>;
    //
    // // Get Retweets
    // getRetweetsAsync(parameters: IGetRetweetsParameters): Promise<ITwitterResult<ITweetDTO[]>>;
    //
    // // Get Retweeters Ids
    // getRetweeterIdsAsync(parameters: IGetRetweeterIdsParameters): Promise<ITwitterResult<IIdsCursorQueryResultDTO>>;
    //
    // // Destroy Tweet
    // destroyTweetAsync(parameters: IDestroyTweetParameters): Promise<ITwitterResult<ITweetDTO>>;

    votePostAsync(params: HttpParams): Observable<any> {
        return this.api.put(this.voteApiController, {}, {params});
    }

    getLikers(url: string) {
        return this.api.get(`${this.apiController}/${url}`);
    }

    // unfavoriteTweetAsync(parameters: IUnfavoriteTweetParameters): Promise<ITwitterResult<ITweetDTO>>;
    //
    // getFavoriteTweetsAsync(parameters: IGetUserFavoriteTweetsParameters): Promise<ITwitterResult<ITweetDTO[]>>;
    //
    // getOEmbedTweetAsync(parameters: IGetOEmbedTweetParameters): Promise<ITwitterResult<IOEmbedTweetDTO>>;
}
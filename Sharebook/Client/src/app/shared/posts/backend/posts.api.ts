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

@Injectable()
export class PostsApi {
    private readonly apiController: string = 'posts';
    private readonly voteApiController: string = 'vote';

    constructor(private api: HttpService) {
    }

    getTweetAsync(params: HttpParams): Observable<any> { // Promise<ITwitterResult<ITweetDTO>>;
        return this.api.get(this.apiController, { params });
    }

    getTweetsAsync(params: HttpParams): Observable<any[]> {
        return this.api.get(this.apiController, { params });
    }

    publishTweetAsync(params: HttpParams): Observable<any> {
        return this.api.post(this.apiController, {},{ params });
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
         return this.api.put(this.voteApiController, {},{ params });
     }

    // unfavoriteTweetAsync(parameters: IUnfavoriteTweetParameters): Promise<ITwitterResult<ITweetDTO>>;
    //
    // getFavoriteTweetsAsync(parameters: IGetUserFavoriteTweetsParameters): Promise<ITwitterResult<ITweetDTO[]>>;
    //
    // getOEmbedTweetAsync(parameters: IGetOEmbedTweetParameters): Promise<ITwitterResult<IOEmbedTweetDTO>>;
}

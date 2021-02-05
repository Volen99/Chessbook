import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TweetQueryGeneratorService} from "./tweet-query-generator.service";
import {PostsApi} from "./backend/posts.api";
import {TweetControllerService} from "./tweet-controller.service";
import {TweetQueryExecutorService} from "./tweet-query-executor.service.";
import {TweetsRequesterService} from "./tweets-requester.service";
import {PostsService} from "./posts.service";
import {TimelineApi} from "../timeline/backend/timeline.api";

@NgModule({
    declarations: [],

    imports: [
        CommonModule
    ],

    providers: [
        PostsService,
        TweetQueryGeneratorService,
        TweetControllerService,
        TweetQueryExecutorService,
        TweetsRequesterService,
        PostsApi,
        TimelineApi,
    ],

})
export class PostsModule {
}

import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {CommonModule} from '@angular/common';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

import {UserQueryParameterGeneratorService} from "./services/user-query-parameter-generator.service";
import {PostsModule} from "./posts/posts.module";
import {ShareButtonComponent} from "../share-button/share-button.component";
import {NbButtonModule} from "../sharebook-nebular/theme/components/button/button.module";
import {VideoListHeaderComponent} from "./post-miniature/video-list-header.component";
import {NbTooltipModule} from "../sharebook-nebular/theme/components/tooltip/tooltip.module";
import {RelationshipsService} from "./shared-main/relationships/relationships.service";
import {RelationshipsApi} from "./shared-main/relationships/backend/relationships.api";
import {FollowButtonComponent} from "./user-follow/follow-button.component";
import {UserFollowService} from "./user-follow/user-follow.service";
import {SurveyService} from "./services/survey.service";

@NgModule({
  declarations: [ShareButtonComponent, VideoListHeaderComponent, FollowButtonComponent],
  imports: [
    CommonModule,
    RouterModule,
    PostsModule,
    NbButtonModule,
    NbTooltipModule,
    FontAwesomeModule,
  ],
  exports: [
    ShareButtonComponent,
    FollowButtonComponent,
  ],
  providers: [
    UserQueryParameterGeneratorService,
    RelationshipsService,
    RelationshipsApi,
    UserFollowService,
    SurveyService,
  ]
})
export class SharedModule {
}

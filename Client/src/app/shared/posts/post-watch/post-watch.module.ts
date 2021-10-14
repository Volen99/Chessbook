import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatRippleModule} from "@angular/material/core";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

import {PostWatchRoutingModule} from "./post-watch-routing.module";
import {PostWatchComponent} from "./post-watch.component";
import {SharedMainModule} from "../../shared-main/shared-main.module";
import {SidebarColumnModule} from "../../sidebar-column/sidebar-column.module";
import {NbCardModule} from "../../../sharebook-nebular/theme/components/card/card.module";
import {NbIconModule} from "../../../sharebook-nebular/theme/components/icon/icon.module";
import { PostThreadComponent } from './post-thread/post-thread.component';
import {NbContextMenuModule} from "../../../sharebook-nebular/theme/components/context-menu/context-menu.module";
import { LikesComponent } from './likes/likes.component';
import {NbListModule} from "../../../sharebook-nebular/theme/components/list/list.module";
import {NbUserModule} from "../../../sharebook-nebular/theme/components/user/user.module";
import {SharedModule} from "../../shared.module";
import {NbButtonModule} from "../../../sharebook-nebular/theme/components/button/button.module";
import {NbActionsModule} from "../../../sharebook-nebular/theme/components/actions/actions.module";
import {UserFollowModule} from "../../user-follow/user-follow.module";
import {VideoCommentsComponent} from "./shared/comment/video-comments.component";
import {VideoCommentComponent} from "./shared/comment/video-comment.component";
import {VideoCommentAddComponent} from "./shared/comment/video-comment-add.component";
import {VideoCommentService} from "../../shared-post-comment/video-comment.service";
import {SharedActorImageModule} from "../../shared-actor-image/shared-actor-image.module";
import {NbInputModule} from "../../../sharebook-nebular/theme/components/input/input.module";
import {SharedFormModule} from "../../shared-forms/shared-form.module";
import {SharedModerationModule} from "../../shared-moderation/shared-moderation.module";
import {TimestampRouteTransformerDirective} from "./shared/timestamp-route-transformer.directive";
import { PostAttributesComponent } from './shared/metadata/post-attributes/post-attributes.component';
import {NbTagModule} from "../../../sharebook-nebular/theme/components/tag/tag.module";
import {SharedShareModal} from "../../shared-share-modal/shared-share-modal.module";
import {ComponentsModule} from "../../../components/components.module";

@NgModule({
  declarations: [
    PostWatchComponent,
    PostThreadComponent,
    LikesComponent,

    VideoCommentsComponent,
    VideoCommentAddComponent,
    VideoCommentComponent,

    TimestampRouteTransformerDirective,
     PostAttributesComponent,
  ],

  imports: [
    CommonModule,
    PostWatchRoutingModule,
    SharedMainModule,
    SidebarColumnModule,
    NbCardModule,
    NbIconModule,
    NbContextMenuModule,
    NbListModule,
    NbUserModule,
    SharedModule,
    FontAwesomeModule,
    NbButtonModule,
    NbActionsModule,
    UserFollowModule,
    MatRippleModule,
    SharedActorImageModule,
    NbInputModule,
    SharedFormModule,
    SharedModerationModule,
    NbTagModule,
    SharedShareModal,
    ComponentsModule,
  ],

  exports: [
    TimestampRouteTransformerDirective
  ],

  providers: [
    VideoCommentService,
  ],

})
export class PostWatchModule {
}

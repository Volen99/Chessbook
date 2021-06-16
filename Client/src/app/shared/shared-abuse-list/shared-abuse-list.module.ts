import {TableModule} from 'primeng/table';
import {NgModule} from '@angular/core';
import {SharedMainModule} from '../shared-main/shared-main.module';
import {AbuseDetailsComponent} from './abuse-details.component';
import {AbuseListTableComponent} from './abuse-list-table.component';
import {AbuseMessageModalComponent} from './abuse-message-modal.component';
import {ModerationCommentModalComponent} from './moderation-comment-modal.component';
import {SharedModerationModule} from "../shared-moderation/shared-moderation.module";
import {SharedVideoCommentModule} from "../shared-post-comment/shared-video-comment.module";
import {SharedFormModule} from "../shared-forms/shared-form.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {SharedActorImageModule} from "../shared-actor-image/shared-actor-image.module";
import {NbInputModule} from "../../sharebook-nebular/theme/components/input/input.module";

@NgModule({
  imports: [
    TableModule,

    SharedMainModule,
    SharedFormModule,
    SharedModerationModule,
    SharedVideoCommentModule,
    FontAwesomeModule,
    SharedActorImageModule,
    NbInputModule
  ],

  declarations: [
    AbuseDetailsComponent,
    AbuseListTableComponent,
    ModerationCommentModalComponent,
    AbuseMessageModalComponent
  ],

  exports: [
    AbuseDetailsComponent,
    AbuseListTableComponent,
    ModerationCommentModalComponent,
    AbuseMessageModalComponent
  ],

  providers: []
})
export class SharedAbuseListModule {
}

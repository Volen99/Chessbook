import {NgModule} from '@angular/core';
import {SharedMainModule} from '../shared-main/shared-main.module';
import {AbuseService} from './abuse.service';
import {BatchDomainsModalComponent} from './batch-domains-modal.component';
import {BlocklistService} from './blocklist.service';
import {BulkService} from './bulk.service';
import {UserBanModalComponent} from './user-ban-modal.component';
import {UserModerationDropdownComponent} from './user-moderation-dropdown.component';
import {VideoBlockComponent} from './video-block.component';
import {VideoBlockService} from './video-block.service';
import {SharedVideoCommentModule} from "../shared-post-comment/shared-video-comment.module";
import {SharedFormModule} from "../shared-forms/shared-form.module";
import {CommentReportComponent} from "./report-modals/comment-report.component";
import {VideoReportComponent} from "./report-modals/video-report.component";
import {AccountReportComponent} from "./report-modals/account-report.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NbCheckboxModule} from "../../sharebook-nebular/theme/components/checkbox/checkbox.module";
import {NbCardModule} from "../../sharebook-nebular/theme/components/card/card.module";
import {NbButtonModule} from "../../sharebook-nebular/theme/components/button/button.module";
import {NbInputModule} from "../../sharebook-nebular/theme/components/input/input.module";
import {TournamentService} from "./tournament-service";

@NgModule({
  imports: [
    SharedMainModule,
    SharedFormModule,
    SharedVideoCommentModule,
    FontAwesomeModule,
    NbCheckboxModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule
  ],

  declarations: [
    UserBanModalComponent,
    UserModerationDropdownComponent,
    VideoBlockComponent,
    VideoReportComponent,
    BatchDomainsModalComponent,
    CommentReportComponent,
    AccountReportComponent
  ],

  exports: [
    UserBanModalComponent,
    UserModerationDropdownComponent,
    VideoBlockComponent,
    VideoReportComponent,
    BatchDomainsModalComponent,
    CommentReportComponent,
    AccountReportComponent
  ],

  providers: [
    BlocklistService,
    BulkService,
    AbuseService,
    VideoBlockService,
    TournamentService,
  ]
})
export class SharedModerationModule {
}

import {NgModule} from '@angular/core';

import {OptionComponent, SurveyComponent} from './survey/survey.component';
import {AdminComponent} from './admin.component';
import {AdminRoutingModule} from "./admin-routing-module";
import {NbCardModule} from "../sharebook-nebular/theme/components/card/card.module";
import {NbIconModule} from "../sharebook-nebular/theme/components/icon/icon.module";
import {NbSelectModule} from "../sharebook-nebular/theme/components/select/select.module";
import {NbInputModule} from "../sharebook-nebular/theme/components/input/input.module";
import {NbButtonModule} from "../sharebook-nebular/theme/components/button/button.module";
import {SurveyService} from "../shared/services/survey.service";
import {SharedMainModule} from "../shared/shared-main/shared-main.module";
import {
  UserListComponent,
  UsersComponent,
} from "./users";
import {SharedFormModule} from "../shared/shared-forms/shared-form.module";
import {SharedModerationModule} from "../shared/shared-moderation/shared-moderation.module";
import {SharedVideoCommentModule} from "../shared/shared-post-comment/shared-video-comment.module";
import {SharedCustomMarkupModule} from "../shared/shared-custom-markup";
import {SelectButtonModule} from "primeng/selectbutton";
import {TableModule} from "primeng/table";
import {SharedActorImageEditModule} from "../shared/shared-actor-image-edit/shared-actor-image-edit.module";
import {SharedActorImageModule} from "../shared/shared-actor-image/shared-actor-image.module";
import {SharedAbuseListModule} from "../shared/shared-abuse-list/shared-abuse-list.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {
  AbuseListComponent,
  InstanceAccountBlocklistComponent,
  ModerationComponent,
  VideoBlockListComponent
} from "./moderation";
import {VideoCommentListComponent} from "./moderation/video-comment-list";
import {UserPasswordComponent, UserUpdateComponent} from "./users/user-edit";
import { TournamentComponent } from './tournaments/tournament.component';
import {Ng2SmartTableModule} from "ng2-smart-table";
import { DonatorComponent } from './donations/donator.component';
import {DonationsService} from "./donations/donations-service";

@NgModule({
  declarations: [
    SurveyComponent,
    AdminComponent,
    OptionComponent,



    UsersComponent,
    UserUpdateComponent,
    UserPasswordComponent,
    UserListComponent,

    ModerationComponent,
    VideoBlockListComponent,
    AbuseListComponent,
    VideoCommentListComponent,

    InstanceAccountBlocklistComponent,
     TournamentComponent,
     DonatorComponent,
  ],
  imports: [
    AdminRoutingModule,

    SharedMainModule,
    SharedFormModule,
    SharedModerationModule,
    SharedAbuseListModule,
    SharedVideoCommentModule,
    SharedActorImageModule,
    SharedActorImageEditModule,
    SharedCustomMarkupModule,

    TableModule,
    SelectButtonModule,
    FontAwesomeModule,
    NbIconModule,
    NbCardModule,
    NbSelectModule,
    NbButtonModule,
    NbInputModule,
    Ng2SmartTableModule,
  ],

  exports: [
    AdminComponent,
    SurveyComponent
  ],

  providers: [SurveyService, DonationsService]
})
export class AdminModule {
}

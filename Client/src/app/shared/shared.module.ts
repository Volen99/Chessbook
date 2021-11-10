import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {CommonModule} from '@angular/common';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

import {UserQueryParameterGeneratorService} from "./services/user-query-parameter-generator.service";
import {PostsModule} from "./posts/posts.module";
import {ShareButtonComponent} from "../share-button/share-button.component";
import {NbButtonModule} from "../sharebook-nebular/theme/components/button/button.module";
import {NbTooltipModule} from "../sharebook-nebular/theme/components/tooltip/tooltip.module";
import {RelationshipsService} from "./shared-main/relationships/relationships.service";
import {RelationshipsApi} from "./shared-main/relationships/backend/relationships.api";
import {SurveyService} from "./services/survey.service";
import { ListUsersComponent } from './list-users/list-users.component';
import {NbCardModule} from "../sharebook-nebular/theme/components/card/card.module";
import {UserFollowModule} from "./user-follow/user-follow.module";
import {SharedMainModule} from "./shared-main/shared-main.module";
import {TagsService} from "./services/tags.service";
import {ContactAdminModalComponent} from "./shared-messages/contact-admin-modal.component";
import {ChatService} from "./shared-messages/chat.service";
import {NbInputModule} from "../sharebook-nebular/theme/components/input/input.module";
import {NbListModule} from "../sharebook-nebular/theme/components/list/list.module";
import {AssetService} from "./services/assets.service";

@NgModule({
  declarations: [ShareButtonComponent, ListUsersComponent, ContactAdminModalComponent],
  imports: [
    CommonModule,
    RouterModule,
    PostsModule,
    NbButtonModule,
    NbTooltipModule,
    FontAwesomeModule,
    NbCardModule,
    UserFollowModule,
    SharedMainModule,
    NbInputModule,
    NbListModule,
  ],
  exports: [
    ShareButtonComponent,
    ListUsersComponent,
  ],
  providers: [
    UserQueryParameterGeneratorService,
    RelationshipsService,
    RelationshipsApi,
    SurveyService,
    TagsService,
    ChatService,
    AssetService,
  ]
})
export class SharedModule {
}

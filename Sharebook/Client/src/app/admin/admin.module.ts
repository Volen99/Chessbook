import {NgModule} from '@angular/core';
import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './admin.component';
import {ConfigService} from './config/shared/config.service';
import {FollowingListComponent} from './follows/following-list/following-list.component';
import {RedundancyCheckboxComponent} from './follows/shared/redundancy-checkbox.component';
import {VideoRedundancyInformationComponent} from './follows/video-redundancies-list/video-redundancy-information.component';
import {ModerationComponent} from './moderation/moderation.component';
import {DebugComponent, DebugService} from './system/debug';
import {JobsComponent} from './system/jobs/jobs.component';
import {FollowsComponent} from "./follows/follows.component";
import {FollowersListComponent} from "./follows/followers-list/followers-list.component";
import {VideoRedundanciesListComponent} from "./follows/video-redundancies-list/video-redundancies-list.component";
import {VideoBlockListComponent} from "./moderation/video-block-list/video-block-list.component";
import {VideoCommentListComponent} from "./moderation/video-comment-list/video-comment-list.component";
import {AbuseListComponent} from "./moderation/abuse-list/abuse-list.component";
import {InstanceServerBlocklistComponent} from "./moderation/instance-blocklist/instance-server-blocklist.component";
import {InstanceAccountBlocklistComponent} from "./moderation/instance-blocklist/instance-account-blocklist.component";
import {SystemComponent} from "./system/system.component";
import {LogsComponent} from "./system/logs/logs.component";
import {ConfigComponent} from "./config/config.component";
import {EditCustomConfigComponent} from "./config/edit-custom-config/edit-custom-config.component";
import {JobService} from "./system/jobs/job.service";
import {LogsService} from "./system/logs/logs.service";
import {UserUpdateComponent} from "./users/user-edit/user-update.component";
import {UserCreateComponent} from "./users/user-edit/user-create.component";
import {UsersComponent} from "./users/users.component";
import {UserPasswordComponent} from "./users/user-edit/user-password.component";
import {UserListComponent} from "./users/user-list/user-list.component";
import {PluginsComponent} from "./plugins";
import {PluginListInstalledComponent} from "./plugins/plugin-list-installed/plugin-list-installed.component";
import {PluginSearchComponent} from "./plugins/plugin-search/plugin-search.component";
import {PluginShowInstalledComponent} from "./plugins/plugin-show-installed/plugin-show-installed.component";
import {PluginApiService} from "./plugins/shared/plugin-api.service";
import {SharedMainModule} from "../shared/main/shared-main.module";
import {SharedFormModule} from "../shared/shared-forms/shared-form.module";
import {SharedModerationModule} from "../shared/shared-moderation/shared-moderation.module";
import {SharedGlobalIconModule} from "../shared/shared-icons/shared-global-icon.module";
import {SharedVideoCommentModule} from "../shared/shared-video-comment/shared-video-comment.module";
import {SharedAbuseListModule} from "../shared/abuse-list/shared-abuse-list.module";

@NgModule({
  imports: [
    AdminRoutingModule,

    SharedMainModule,
    SharedFormModule,
    SharedModerationModule,
    SharedGlobalIconModule,
    SharedAbuseListModule,
    SharedVideoCommentModule,

    // TableModule,
    // SelectButtonModule,
    // ChartModule,
  ],

  declarations: [
    AdminComponent,

    FollowsComponent,
    FollowersListComponent,
    FollowingListComponent,
    RedundancyCheckboxComponent,
    VideoRedundanciesListComponent,
    VideoRedundancyInformationComponent,

    UsersComponent,
    UserCreateComponent,
    UserUpdateComponent,
    UserPasswordComponent,
    UserListComponent,

    ModerationComponent,
    VideoBlockListComponent,
    AbuseListComponent,
    VideoCommentListComponent,

    InstanceServerBlocklistComponent,
    InstanceAccountBlocklistComponent,

    PluginsComponent,
    PluginListInstalledComponent,
    PluginSearchComponent,
    PluginShowInstalledComponent,

    SystemComponent,
    JobsComponent,
    LogsComponent,
    DebugComponent,

    ConfigComponent,
    EditCustomConfigComponent
  ],

  exports: [
    AdminComponent
  ],

  providers: [
    JobService,
    LogsService,
    DebugService,
    ConfigService,
    PluginApiService,
  ]
})
export class AdminModule {
}

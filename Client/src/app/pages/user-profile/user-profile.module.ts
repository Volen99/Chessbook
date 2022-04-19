import { NgModule } from '@angular/core';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';
import { SidebarColumnModule } from '../../shared/sidebar-column/sidebar-column.module';
import { FollowingComponent } from './following/following.component';
import {SharedMainModule} from "../../shared/shared-main/shared-main.module";
import {NbCardModule} from "../../sharebook-nebular/theme/components/card/card.module";
import {NbTabsetModule} from "../../sharebook-nebular/theme/components/tabset/tabset.module";
import {NbRouteTabsetModule} from "../../sharebook-nebular/theme/components/route-tabset/route-tabset.module";
import {NbButtonModule} from "../../sharebook-nebular/theme/components/button/button.module";
import {NbIconModule} from "../../sharebook-nebular/theme/components/icon/icon.module";
import {NbActionsModule} from "../../sharebook-nebular/theme/components/actions/actions.module";
import {ComponentsModule} from "../../components/components.module";
import {UserProfileService} from "./user-profile.service";
import {SharedModule} from "../../shared/shared.module";
import {SharedActorImageModule} from "../../shared/shared-actor-image/shared-actor-image.module";
import {SharedModerationModule} from "../../shared/shared-moderation/shared-moderation.module";
import { ProfilePostsComponent } from './profile-posts/profile-posts.component';
import {UserFollowModule} from "../../shared/user-follow/user-follow.module";
import {NbListModule} from "../../sharebook-nebular/theme/components/list/list.module";
import {CustomLoadingIndicatorModule} from "../../components/custom-loading-indicator/custom-loading-indicator.module";

@NgModule({
    imports: [
        UserProfileRoutingModule,

        SharedMainModule,
        SidebarColumnModule,
        NbCardModule,
        NbTabsetModule,
        NbRouteTabsetModule,
        NbButtonModule,
        NbIconModule,
        NbActionsModule,
        ComponentsModule,
        FontAwesomeModule,
        SharedModule,
        SharedActorImageModule,
        SharedModerationModule,
        UserFollowModule,
        NbListModule,
        CustomLoadingIndicatorModule,
    ],

  declarations: [
    UserProfileComponent,
    FollowingComponent,
    ProfilePostsComponent,
  ],

  exports: [
    UserProfileComponent
  ],

  providers: [UserProfileService]
})
export class UserProfileModule {
}

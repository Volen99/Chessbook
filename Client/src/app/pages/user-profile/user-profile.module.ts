import { NgModule } from '@angular/core';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';
import { SidebarColumnModule } from '../../shared/sidebar-column/sidebar-column.module';
import { FollowersComponent } from './followers/followers.component';
import {SharedMainModule} from "../../shared/shared-main/shared-main.module";
import {NbCardModule} from "../../sharebook-nebular/theme/components/card/card.module";
import {NbTabsetModule} from "../../sharebook-nebular/theme/components/tabset/tabset.module";
import {NbRouteTabsetModule} from "../../sharebook-nebular/theme/components/route-tabset/route-tabset.module";
import {NbButtonModule} from "../../sharebook-nebular/theme/components/button/button.module";
import {NbIconModule} from "../../sharebook-nebular/theme/components/icon/icon.module";
import {NbActionsModule} from "../../sharebook-nebular/theme/components/actions/actions.module";
import {ComponentsModule} from "../../components/components.module";
import {UserProfileService} from "./user-profile.service";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {SharedModule} from "../../shared/shared.module";
import {SharedActorImageModule} from "../../shared/shared-actor-image/shared-actor-image.module";

@NgModule({
  imports: [
    UserProfileRoutingModule,

    SharedMainModule,
    // SharedFormModule,
    // SharedUserSubscriptionModule,
    // SharedModerationModule,
    // SharedVideoMiniatureModule,
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
    SharedActorImageModule
  ],

  declarations: [
    UserProfileComponent,
    /*UserProfileAboutComponent,*/
    FollowersComponent
  ],

  exports: [
    UserProfileComponent
  ],

  providers: [UserProfileService]
})
export class UserProfileModule {
}

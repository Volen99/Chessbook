import { NgModule } from '@angular/core';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';
import { SidebarColumnModule } from '../../shared/sidebar-column/sidebar-column.module';
import { SharedGlobalIconModule } from '../../shared/shared-icons/shared-global-icon.module';
import { FollowersComponent } from './followers/followers.component';
import {SharedMainModule} from "../../shared/shared-main/shared-main.module";
import {NbCardModule} from "../../sharebook-nebular/theme/components/card/card.module";

@NgModule({
  imports: [
    UserProfileRoutingModule,

    SharedMainModule,
    // SharedFormModule,
    // SharedUserSubscriptionModule,
    // SharedModerationModule,
    // SharedVideoMiniatureModule,
    SharedGlobalIconModule,
    SidebarColumnModule,
    NbCardModule
  ],

  declarations: [
    UserProfileComponent,
    /*UserProfileAboutComponent,*/
    FollowersComponent
  ],

  exports: [
    UserProfileComponent
  ],

  providers: []
})
export class UserProfileModule {
}

import { NgModule } from '@angular/core';
import { SharedMainModule } from '../shared/shared-main';
import { SharedModerationModule } from '../shared/shared-moderation';
import { SharedUserSubscriptionModule } from '../shared/shared-user-subscription';
import { SharedVideoMiniatureModule } from '../shared/shared-video-miniature';
import { UserProfileAboutComponent } from './user-profile-about/user-profile-about.component';
import { UserProfileVideoChannelsComponent } from './user-profile-video-channels/user-profile-video-channels.component';
import { UserProfileVideosComponent } from './user-profile-videos/user-profile-videos.component';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';
import { SidebarColumnModule } from '../shared/sidebar-column/sidebar-column.module';
import { SharedGlobalIconModule } from '../shared/shared-icons/shared-global-icon.module';
import { SharedFormModule } from '../shared/shared-forms/shared-form.module';
import { FollowersComponent } from './followers/followers.component';

@NgModule({
  imports: [
    UserProfileRoutingModule,

    SharedMainModule,
    SharedFormModule,
    SharedUserSubscriptionModule,
    SharedModerationModule,
    SharedVideoMiniatureModule,
    SharedGlobalIconModule,
    SidebarColumnModule
  ],

  declarations: [
    UserProfileComponent,
    UserProfileVideosComponent,
    UserProfileVideoChannelsComponent,
    UserProfileAboutComponent,
    FollowersComponent
  ],

  exports: [
    UserProfileComponent
  ],

  providers: []
})
export class UserProfileModule {
}

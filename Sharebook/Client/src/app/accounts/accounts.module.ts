import {NgModule} from '@angular/core';
import {AccountAboutComponent} from './account-about/account-about.component';
import {AccountVideoChannelsComponent} from './account-video-channels/account-video-channels.component';
import {AccountVideosComponent} from './account-videos/account-videos.component';
import {AccountsRoutingModule} from './accounts-routing.module';
import {AccountsComponent} from './accounts.component';
import {SharedFormModule} from "../shared/shared-forms/shared-form.module";
import {SharedMainModule} from "../shared/main/shared-main.module";
import {SharedUserSubscriptionModule} from "../shared/shared-user-subscription/shared-user-subscription.module";
import {SharedModerationModule} from "../shared/shared-moderation/shared-moderation.module";
import {SharedVideoMiniatureModule} from "../shared/shared-video-miniature/shared-video-miniature.module";
import {SharedGlobalIconModule} from "../shared/shared-icons/shared-global-icon.module";

@NgModule({
  imports: [
    AccountsRoutingModule,

    SharedMainModule,
    SharedFormModule,
    SharedUserSubscriptionModule,
    SharedModerationModule,
    SharedVideoMiniatureModule,
    SharedGlobalIconModule,
  ],

  declarations: [
    AccountsComponent,
    AccountVideosComponent,
    AccountVideoChannelsComponent,
    AccountAboutComponent,
  ],

  exports: [
    AccountsComponent,
  ],

  providers: []
})
export class AccountsModule {
}

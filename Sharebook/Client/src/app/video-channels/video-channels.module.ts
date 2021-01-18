import { NgModule } from '@angular/core';
import { VideoChannelAboutComponent } from './video-channel-about/video-channel-about.component';
import { VideoChannelPlaylistsComponent } from './video-channel-playlists/video-channel-playlists.component';
import { VideoChannelVideosComponent } from './video-channel-videos/video-channel-videos.component';
import { VideoChannelsRoutingModule } from './video-channels-routing.module';
import { VideoChannelsComponent } from './video-channels.component';
import { SharedMainModule } from '../shared/shared-main';
import { SharedFormModule } from '../shared/shared-forms/shared-form.module';
import { SharedVideoPlaylistModule } from '../shared/shared-video-playlist';
import { SharedVideoMiniatureModule } from '../shared/shared-video-miniature';
import { SharedUserSubscriptionModule } from '../shared/shared-user-subscription';
import { SharedGlobalIconModule } from '../shared/shared-icons/shared-global-icon.module';

@NgModule({
  imports: [
    VideoChannelsRoutingModule,

    SharedMainModule,
    SharedFormModule,
    SharedVideoPlaylistModule,
    SharedVideoMiniatureModule,
    SharedUserSubscriptionModule,
    SharedGlobalIconModule
  ],

  declarations: [
    VideoChannelsComponent,
    VideoChannelVideosComponent,
    VideoChannelAboutComponent,
    VideoChannelPlaylistsComponent
  ],

  exports: [
    VideoChannelsComponent
  ],

  providers: []
})
export class VideoChannelsModule {
}

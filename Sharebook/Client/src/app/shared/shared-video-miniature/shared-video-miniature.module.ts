import {NgModule} from '@angular/core';
import {SharedVideoPlaylistModule} from '../shared-video-playlist/shared-video-playlist.module';
import {VideoActionsDropdownComponent} from './video-actions-dropdown.component';
import {VideoDownloadComponent} from './video-download.component';
import {VideoMiniatureComponent} from './video-miniature.component';
import {VideosSelectionComponent} from './videos-selection.component';
import {SharedMainModule} from "../main/shared-main.module";
import {SharedFormModule} from "../shared-forms/shared-form.module";
import {SharedModerationModule} from "../shared-moderation/shared-moderation.module";
import {SharedThumbnailModule} from "../shared-thumbnail/shared-thumbnail.module";
import {SharedGlobalIconModule} from "../shared-icons/shared-global-icon.module";
import {SharedVideoLiveModule} from "../shared-video-live/shared-video-live.module";
import {SharedVideoModule} from "../shared-video/shared-video.module";

@NgModule({
  imports: [
    SharedMainModule,
    SharedFormModule,
    SharedModerationModule,
    SharedVideoPlaylistModule,
    SharedThumbnailModule,
    SharedGlobalIconModule,
    SharedVideoLiveModule,
    SharedVideoModule
  ],

  declarations: [
    VideoActionsDropdownComponent,
    VideoDownloadComponent,
    VideoMiniatureComponent,
    VideosSelectionComponent
  ],

  exports: [
    VideoActionsDropdownComponent,
    VideoDownloadComponent,
    VideoMiniatureComponent,
    VideosSelectionComponent
  ],

  providers: []
})
export class SharedVideoMiniatureModule {
}

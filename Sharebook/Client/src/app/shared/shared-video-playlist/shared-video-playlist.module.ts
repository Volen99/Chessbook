import {NgModule} from '@angular/core';
import {VideoAddToPlaylistComponent} from './video-add-to-playlist.component';
import {VideoPlaylistElementMiniatureComponent} from './video-playlist-element-miniature.component';
import {VideoPlaylistMiniatureComponent} from './video-playlist-miniature.component';
import {VideoPlaylistService} from './video-playlist.service';
import {SharedMainModule} from "../main/shared-main.module";
import {SharedFormModule} from "../shared-forms/shared-form.module";
import {SharedThumbnailModule} from "../shared-thumbnail/shared-thumbnail.module";
import {SharedGlobalIconModule} from "../shared-icons/shared-global-icon.module";

@NgModule({
  imports: [
    SharedMainModule,
    SharedFormModule,
    SharedThumbnailModule,
    SharedGlobalIconModule
  ],

  declarations: [
    VideoAddToPlaylistComponent,
    VideoPlaylistElementMiniatureComponent,
    VideoPlaylistMiniatureComponent
  ],

  exports: [
    VideoAddToPlaylistComponent,
    VideoPlaylistElementMiniatureComponent,
    VideoPlaylistMiniatureComponent
  ],

  providers: [
    VideoPlaylistService
  ]
})
export class SharedVideoPlaylistModule {
}

import { NgModule } from '@angular/core';
import { SharedMainModule } from '../shared-main/shared-main.module';
import { SharedThumbnailModule } from '../shared-thumbnail';
import { VideoAddToPlaylistComponent } from './video-add-to-playlist.component';
import { VideoPlaylistElementMiniatureComponent } from './video-playlist-element-miniature.component';
import { VideoPlaylistMiniatureComponent } from './video-playlist-miniature.component';
import { VideoPlaylistService } from './video-playlist.service';
import { SharedGlobalIconModule } from '../shared-icons/shared-global-icon.module';
import { SharedFormModule } from '../shared-forms/shared-form.module';

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

import {NgModule} from '@angular/core';
import {VideoEditModule} from './shared/video-edit.module';
import {DragDropDirective} from './video-add-components/drag-drop.directive';
import {VideoImportTorrentComponent} from './video-add-components/video-import-torrent.component';
import {VideoImportUrlComponent} from './video-add-components/video-import-url.component';
import {VideoGoLiveComponent} from './video-add-components/video-go-live.component';
import {VideoUploadComponent} from './video-add-components/video-upload.component';
import {VideoAddRoutingModule} from './video-add-routing.module';
import {VideoAddComponent} from './video-add.component';
import {CanDeactivateGuard} from "../../core/routing/can-deactivate-guard.service";

@NgModule({
  imports: [
    VideoAddRoutingModule,

    VideoEditModule
  ],

  declarations: [
    VideoAddComponent,
    VideoUploadComponent,
    VideoImportUrlComponent,
    VideoImportTorrentComponent,
    DragDropDirective,
    VideoGoLiveComponent
  ],

  exports: [],

  providers: [
    CanDeactivateGuard
  ]
})
export class VideoAddModule {
}

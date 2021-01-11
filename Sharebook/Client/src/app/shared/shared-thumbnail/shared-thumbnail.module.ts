import {NgModule} from '@angular/core';
import {VideoThumbnailComponent} from './video-thumbnail.component';
import {SharedGlobalIconModule} from "../shared-icons/shared-global-icon.module";
import {SharedMainModule} from "../main/shared-main.module";

@NgModule({
  imports: [
    SharedMainModule,
    SharedGlobalIconModule
  ],

  declarations: [
    VideoThumbnailComponent
  ],

  exports: [
    VideoThumbnailComponent
  ],

  providers: []
})
export class SharedThumbnailModule {
}

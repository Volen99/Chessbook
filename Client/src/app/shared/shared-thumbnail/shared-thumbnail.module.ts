import {NgModule} from '@angular/core';

import {SharedMainModule} from '../shared-main/shared-main.module';
import {VideoThumbnailComponent} from './video-thumbnail.component';

@NgModule({
  imports: [
    SharedMainModule,
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

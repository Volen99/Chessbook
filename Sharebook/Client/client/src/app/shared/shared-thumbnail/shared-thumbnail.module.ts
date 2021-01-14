import { NgModule } from '@angular/core';
import { SharedMainModule } from '../shared-main/shared-main.module';
import { VideoThumbnailComponent } from './video-thumbnail.component';
import { SharedGlobalIconModule } from '../shared-icons/shared-global-icon.module';

@NgModule({
  imports: [
    SharedMainModule,
    SharedGlobalIconModule,
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

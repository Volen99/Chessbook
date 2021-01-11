import {NgModule} from '@angular/core';
import {VideoViewsCounterComponent} from './video-views-counter.component';
import {SharedMainModule} from "../main/shared-main.module";

@NgModule({
  imports: [
    SharedMainModule
  ],

  declarations: [
    VideoViewsCounterComponent
  ],

  exports: [
    VideoViewsCounterComponent
  ]
})
export class SharedVideoModule {
}

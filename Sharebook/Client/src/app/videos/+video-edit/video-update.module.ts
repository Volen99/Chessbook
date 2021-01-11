import {NgModule} from '@angular/core';
import {VideoEditModule} from './shared/video-edit.module';
import {VideoUpdateRoutingModule} from './video-update-routing.module';
import {VideoUpdateComponent} from './video-update.component';
import {VideoUpdateResolver} from './video-update.resolver';
import {CanDeactivateGuard} from "../../core/routing/can-deactivate-guard.service";

@NgModule({
  imports: [
    VideoUpdateRoutingModule,

    VideoEditModule,
  ],

  declarations: [
    VideoUpdateComponent,
  ],

  exports: [],

  providers: [
    VideoUpdateResolver,
    CanDeactivateGuard,
  ]
})
export class VideoUpdateModule {
}

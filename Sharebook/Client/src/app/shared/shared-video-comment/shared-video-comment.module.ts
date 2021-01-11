import {NgModule} from '@angular/core';
import {VideoCommentService} from './video-comment.service';
import {SharedMainModule} from "../main/shared-main.module";

@NgModule({
  imports: [
    SharedMainModule
  ],

  declarations: [],

  exports: [],

  providers: [
    VideoCommentService
  ]
})
export class SharedVideoCommentModule {
}

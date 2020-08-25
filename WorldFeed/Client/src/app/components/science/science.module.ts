import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ViewComponent} from './view/view.component';
import {SharedModule} from '../../core/shared-core/shared.module';
import {ScienceRoutingModule} from './science-routing.module';
import {PostComponent} from './post/post.component';
import {ScienceService} from '../../core/science/services/science.service';
import {ListPostsComponent} from './list-posts/list-posts.component';
import {DndDirective} from './direcitives/dnd.directive';
import {UploadVideoService} from '../../core/services/upload/upload-video.service';
import { HighlightDirective } from './direcitives/highlight.directive';
import {UploadComponent} from "./upload/upload.component";

@NgModule({
  declarations: [
    ViewComponent,
    PostComponent,
    UploadComponent,
    ListPostsComponent,
    DndDirective,
    HighlightDirective,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ScienceRoutingModule,
  ],
  exports: [                // Custom made modules have exports array
    ViewComponent,
    PostComponent,
    ListPostsComponent,
    DndDirective,
    HighlightDirective,
    UploadComponent,
  ],
  providers: [ScienceService, UploadVideoService]
})

export class ScienceModule {}

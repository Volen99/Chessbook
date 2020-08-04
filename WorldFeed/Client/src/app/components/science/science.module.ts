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

@NgModule({
  declarations: [
    ViewComponent,
    PostComponent,
    ListPostsComponent,
    DndDirective,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ScienceRoutingModule,
  ],
  exports: [
    ViewComponent,
    PostComponent,
    ListPostsComponent,
    DndDirective,
  ],
  providers: [ScienceService, UploadVideoService]
})

export class ScienceModule {}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ScienceViewComponent} from './view/science-view.component';
import {SharedModule} from '../../../../core/shared-core/shared.module';
import {ScienceRoutingModule} from './science-routing.module';
import {PostComponent} from './post/post.component';
import {ScienceService} from '../../../../core/history/BC/science/services/science.service';
import {ListPostsComponent} from './list-posts/list-posts.component';
import {SignalRScienceService} from '../../../../core/history/BC/science/services/signalR-science-service';
import {DndDirective} from './direcitives/dnd.directive';
import {UploadVideoService} from '../../../../core/services/upload/upload-video.service';

@NgModule({
  declarations: [
    ScienceViewComponent,
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
    ScienceViewComponent,
    PostComponent,
    ListPostsComponent,
    DndDirective,
  ],
  providers: [ScienceService, UploadVideoService]
})

export class ScienceModule {}

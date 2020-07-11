import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ScienceViewComponent} from './view/science-view.component';
import {SharedModule} from '../../../../core/shared/shared.module';
import {ScienceRoutingModule} from './science-routing.module';
import {UploadComponent} from './upload/upload.component';
import {PostComponent} from './post/post.component';
import {ScienceService} from '../../../../core/history/BC/science/services/science.service';
import {ListPostsComponent} from './list-posts/list-posts.component';
import {SignalRScienceService} from '../../../../core/history/BC/science/services/signalR-science-service';
import {DndDirective} from './direcitives/dnd.directive';

@NgModule({
  declarations: [
    ScienceViewComponent,
    UploadComponent,
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
    UploadComponent,
    PostComponent,
    ListPostsComponent,
    DndDirective,
  ],
  providers: [ScienceService, SignalRScienceService]
})

export class ScienceModule {}

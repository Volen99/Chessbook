import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ScienceComponent} from './science.component';
import {SharedModule} from '../../shared/shared.module';
import {ScienceRoutingModule} from './science-routing.module';
import {PostComponent} from './post/post.component';
import {ScienceService} from './science.service';
import {ListPostsComponent} from './list-posts/list-posts.component';
import {DndDirective} from './direcitives/dnd.directive';
import { HighlightDirective } from './direcitives/highlight.directive';
import {UploadComponent} from "./upload/upload.component";

@NgModule({
  declarations: [
    ScienceComponent,
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
    ScienceComponent,
    PostComponent,
    ListPostsComponent,
    DndDirective,
    HighlightDirective,
    UploadComponent,
  ],
  providers: [ScienceService]
})

export class ScienceModule {}

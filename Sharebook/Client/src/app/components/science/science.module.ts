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
import {FileUploadModule} from "../../global-modules/upload/file-upload.module";

@NgModule({
  declarations: [
    ScienceComponent,
    PostComponent,
    ListPostsComponent,
    DndDirective,
    HighlightDirective,
  ],
    imports: [
        CommonModule,
        SharedModule,
        ScienceRoutingModule,
        FileUploadModule,
    ],
  exports: [
    ScienceComponent,
    PostComponent,
    ListPostsComponent,
    DndDirective,
    HighlightDirective,
  ],
  providers: [ScienceService]
})

export class ScienceModule {}

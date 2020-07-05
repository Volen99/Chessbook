import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ScienceViewComponent} from './view/science-view.component';
import {SharedModule} from '../../../shared/shared.module';
import {ScienceRoutingModule} from './science-routing.module';
import {UploadComponent} from './upload/upload.component';
import {PostComponent} from './post/post.component';
import {ScienceService} from './science.service';


@NgModule({
  declarations: [
    ScienceViewComponent,
    UploadComponent,
    PostComponent,
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
  ],
  providers: [ScienceService]
})

export class ScienceModule {}

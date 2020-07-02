import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ScienceViewComponent} from './view/science-view.component';
import {SharedModule} from '../../../shared/shared.module';
import {ScienceRoutingModule} from './science-routing.module';
import {UploadComponent} from './upload/upload.component';


@NgModule({
  declarations: [
    ScienceViewComponent,
    UploadComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ScienceRoutingModule,
  ],
  exports: [
    ScienceViewComponent,
    UploadComponent,
  ]
})

export class ScienceModule {}

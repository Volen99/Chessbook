import { NgModule } from '@angular/core';

import { TimelineComponent } from './timeline.component';
import { SharedGlobalIconModule } from '../shared-icons/shared-global-icon.module';
import {SharedMainModule} from "../shared-main/shared-main.module";

@NgModule({
  declarations: [
    TimelineComponent,
  ],
    imports: [
        SharedMainModule,
        SharedGlobalIconModule
    ],
  exports: [
    TimelineComponent,
  ]
})
export class TimelineModule { }

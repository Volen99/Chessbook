import { NgModule } from '@angular/core';

import { TimelineComponent } from './timeline.component';
import { SharedMainModule } from '../shared-main';
import { SharedGlobalIconModule } from '../shared-icons/shared-global-icon.module';

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

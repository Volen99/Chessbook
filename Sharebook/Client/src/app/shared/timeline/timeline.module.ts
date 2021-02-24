import {NgModule} from '@angular/core';

import {TimelineComponent} from './timeline.component';
import {SharedGlobalIconModule} from '../shared-icons/shared-global-icon.module';
import {SharedMainModule} from "../shared-main/shared-main.module";
import {TimelineService} from "./timeline.service";
import {TimelineQueryGeneratorService} from "./query/timeline-query-generator.service";
import {TimelineApi} from "./backend/timeline.api";
import {NbCardModule} from "../../sharebook-nebular/theme/components/card/card.module";
import {NbIconModule} from "../../sharebook-nebular/theme/components/icon/icon.module";
import {NbListModule} from "../../sharebook-nebular/theme/components/list/list.module";

@NgModule({
  declarations: [
    TimelineComponent,
  ],

  imports: [
    SharedMainModule,
    SharedGlobalIconModule,
    NbCardModule,
    NbIconModule,
    NbListModule
  ],

  exports: [
    TimelineComponent,
  ],

  providers:
    [
      TimelineService,
      TimelineQueryGeneratorService,
      TimelineApi,
    ]
})
export class TimelineModule {
}

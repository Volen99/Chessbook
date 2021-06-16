import {NgModule} from "@angular/core";

import {HomePageComponent} from "./home-page.component";
import { HomeRoutingModule } from './home-routing.module';
import {SharedMainModule} from "../../shared/shared-main/shared-main.module";
import {TimelineModule} from "../../shared/timeline/timeline.module";
import {SidebarColumnModule} from "../../shared/sidebar-column/sidebar-column.module";
import {NbCardModule} from "../../sharebook-nebular/theme/components/card/card.module";
import {NbListModule} from "../../sharebook-nebular/theme/components/list/list.module";
import {NbIconModule} from "../../sharebook-nebular/theme/components/icon/icon.module";
import {TimelineCardsHeaderComponent} from "./timeline-cards-header/timeline-cards-header.component";
import {TimelineService} from "../../shared/timeline/timeline.service";
import {TimelineQueryGeneratorService} from "../../shared/timeline/query/timeline-query-generator.service";
import {TimelineApi} from "../../shared/timeline/backend/timeline.api";

import { LottieModule } from 'ngx-lottie';

export function playerFactory() {
  return import(/* webpackChunkName: 'lottie-web' */ 'lottie-web');
}


@NgModule({
  declarations: [
    HomePageComponent,

    TimelineCardsHeaderComponent,
  ],
  imports: [
    SharedMainModule,

    HomeRoutingModule,
    TimelineModule,
    SidebarColumnModule,
    NbCardModule,
    NbListModule,
    NbIconModule,
    LottieModule.forRoot({ player: playerFactory })
  ],
  providers: [
    TimelineService,
    TimelineQueryGeneratorService,
    TimelineApi,
  ]
})
export class HomeModule {
}

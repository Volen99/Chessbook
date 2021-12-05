import {NgModule} from "@angular/core";

import {HomePageComponent} from "./home-page.component";
import { HomeRoutingModule } from './home-routing.module';
import {SharedMainModule} from "../../shared/shared-main/shared-main.module";
import {SidebarColumnModule} from "../../shared/sidebar-column/sidebar-column.module";
import {NbCardModule} from "../../sharebook-nebular/theme/components/card/card.module";
import {NbListModule} from "../../sharebook-nebular/theme/components/list/list.module";
import {TimelineCardsHeaderComponent} from "./timeline-cards-header/timeline-cards-header.component";
import {TimelineApi} from "../../shared/timeline/backend/timeline.api";

import { LottieModule } from 'ngx-lottie';
import {NbSidebarModule} from "../../sharebook-nebular/theme/components/sidebar/sidebar.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

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
    SidebarColumnModule,
    NbCardModule,
    NbListModule,
    LottieModule.forRoot({player: playerFactory}),
    NbSidebarModule,
    FontAwesomeModule
  ],
  providers: [
    TimelineApi,
  ]
})
export class HomeModule {
}

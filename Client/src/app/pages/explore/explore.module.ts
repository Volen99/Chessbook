import {NgModule} from "@angular/core";

import {CommonModule} from "@angular/common";
import { TimelineModule } from '../../shared/timeline/timeline.module';
import { SidebarColumnModule } from '../../shared/sidebar-column/sidebar-column.module';
import { ExploreRoutingModule } from './explore-routing.module';
import { ExploreComponent } from './explore.component';
import {NbCardModule} from "../../sharebook-nebular/theme/components/card/card.module";
import {ExploreService} from "./explore.service";
import {SharedMainModule} from "../../shared/shared-main/shared-main.module";
import {NbListModule} from "../../sharebook-nebular/theme/components/list/list.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatRippleModule} from "@angular/material/core";

@NgModule({
  declarations: [
    ExploreComponent,
  ],

  imports: [
    ExploreRoutingModule,
    CommonModule,
    TimelineModule,
    SidebarColumnModule,
    NbCardModule,
    SharedMainModule,
    NbListModule,
    FontAwesomeModule,
    MatRippleModule,
  ],

  providers: [
    ExploreService,
  ],
})
export class ExploreModule {
}

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatRippleModule} from "@angular/material/core";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

import { SidebarColumnModule } from '../../shared/sidebar-column/sidebar-column.module';
import { ExploreRoutingModule } from './explore-routing.module';
import { ExploreComponent } from './explore.component';
import {NbCardModule} from "../../sharebook-nebular/theme/components/card/card.module";
import {ExploreService} from "./explore.service";
import {SharedMainModule} from "../../shared/shared-main/shared-main.module";
import {NbListModule} from "../../sharebook-nebular/theme/components/list/list.module";

@NgModule({
  declarations: [
    ExploreComponent,
  ],

  imports: [
    ExploreRoutingModule,
    CommonModule,
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

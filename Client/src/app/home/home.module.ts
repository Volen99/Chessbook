import {NgModule} from "@angular/core";

import {HomePageComponent} from "./home-page.component";
import { HomeRoutingModule } from './home-routing.module';
import {SharedMainModule} from "../shared/shared-main/shared-main.module";
import {TimelineModule} from "../shared/timeline/timeline.module";
import {SidebarColumnModule} from "../shared/sidebar-column/sidebar-column.module";

@NgModule({
  declarations: [
    HomePageComponent,
  ],
  imports: [
    SharedMainModule,

    HomeRoutingModule,
    TimelineModule,
    SidebarColumnModule,
  ]
})
export class HomeModule {
}

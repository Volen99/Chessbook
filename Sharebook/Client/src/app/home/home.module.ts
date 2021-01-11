import {NgModule} from "@angular/core";

import {HomePageComponent} from "./home-page.component";
import {CommonModule} from "@angular/common";
import {TimelineComponent} from "../shared/components/timeline/timeline.component";
import {SidebarColumnComponent} from "../shared/components/sidebar-column/sidebar-column.component";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    HomePageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule, // for timelineComponent
  ]
})
export class HomeModule {
}

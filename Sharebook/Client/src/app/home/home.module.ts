import {NgModule} from "@angular/core";

import {HomePageComponent} from "./home-page.component";
import { TimelineModule } from '../shared/timeline/timeline.module';
import { SidebarColumnModule } from '../shared/sidebar-column/sidebar-column.module';
import { HomeRoutingModule } from './home-routing.module';
import { SharedMainModule } from '../shared/shared-main';

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

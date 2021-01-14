import {NgModule} from "@angular/core";

import {CommonModule} from "@angular/common";
import { TimelineModule } from '../shared/timeline/timeline.module';
import { SidebarColumnModule } from '../shared/sidebar-column/sidebar-column.module';
import { ExploreRoutingModule } from './explore-routing.module';
import { ExploreComponent } from './explore.component';
import { SharedGlobalIconModule } from '../shared/shared-icons/shared-global-icon.module';

@NgModule({
  declarations: [
    ExploreComponent,
  ],
    imports: [
        ExploreRoutingModule,
        CommonModule,
        TimelineModule,
        SidebarColumnModule,
        SharedGlobalIconModule,
    ]
})
export class ExploreModule {
}

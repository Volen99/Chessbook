import {NgModule} from "@angular/core";

import {CommonModule} from "@angular/common";
import { TimelineModule } from '../shared/timeline/timeline.module';
import { SidebarColumnModule } from '../shared/sidebar-column/sidebar-column.module';
import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationsComponent } from './notifications.component';
import { MentionsComponent } from './mentions/mentions.component';
import {SharedMainModule} from "../shared/shared-main/shared-main.module";

@NgModule({
  declarations: [
    NotificationsComponent,
    MentionsComponent,
  ],
  imports: [
    NotificationsRoutingModule,
    CommonModule,
    TimelineModule,
    SidebarColumnModule,
    SharedMainModule,
  ]
})
export class NotificationsModule {
}

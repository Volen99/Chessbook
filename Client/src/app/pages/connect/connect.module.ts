import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import { SidebarColumnModule } from '../../shared/sidebar-column/sidebar-column.module';
import { ConnectRoutingModule } from './connect-routing.module';
import {ConnectComponent} from "./connect.component";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [
    ConnectComponent,
  ],
  imports: [
    ConnectRoutingModule,
    CommonModule,
    SharedModule,
    SidebarColumnModule,
  ]
})
export class ConnectModule {
}

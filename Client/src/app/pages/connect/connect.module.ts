import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import { SidebarColumnModule } from '../../shared/sidebar-column/sidebar-column.module';
import { ConnectRoutingModule } from './connect-routing.module';
import {ConnectComponent} from "./connect.component";
import {SharedModule} from "../../shared/shared.module";
import {NbCardModule} from "../../sharebook-nebular/theme/components/card/card.module";

@NgModule({
  declarations: [
    ConnectComponent,
  ],
  imports: [
    ConnectRoutingModule,
    CommonModule,
    SharedModule,
    SidebarColumnModule,
    NbCardModule,
  ]
})
export class ConnectModule {
}

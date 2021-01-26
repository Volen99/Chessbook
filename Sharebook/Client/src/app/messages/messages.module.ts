import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesComponent } from './messages.component';
import { DetailHeaderMessageSelectedComponent } from './detail-header-message-selected/detail-header-message-selected.component';
import { SharedGlobalIconModule } from '../shared/shared-icons/shared-global-icon.module';
import {SharedMainModule} from "../shared/shared-main/shared-main.module";
import {DetailHeaderNoMessageSelectedComponent} from "./detail-header-no-message-selected/detail-header-no-message-selected.component";

@NgModule({
  declarations: [
    MessagesComponent,
    DetailHeaderMessageSelectedComponent,
    DetailHeaderNoMessageSelectedComponent,
  ],
  imports: [
    CommonModule,
    MessagesRoutingModule,
    SharedGlobalIconModule,
    SharedMainModule,
  ]
})
export class MessagesModule {
}

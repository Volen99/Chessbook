import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesComponent } from './messages.component';
import { DetailHeaderMessageSelectedComponent } from './detail-header-message-selected/detail-header-message-selected.component';
import { SharedGlobalIconModule } from '../shared/shared-icons/shared-global-icon.module';

@NgModule({
  declarations: [
    MessagesComponent,
    DetailHeaderMessageSelectedComponent,
  ],
  imports: [
    CommonModule,
    MessagesRoutingModule,
    SharedGlobalIconModule,
  ]
})
export class MessagesModule {
}

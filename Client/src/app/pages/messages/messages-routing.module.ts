import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MessagesComponent } from './messages.component';
import { DetailHeaderMessageSelectedComponent } from './detail-header-message-selected/detail-header-message-selected.component';

const routes: Routes = [
  {
    path: '',
    component: MessagesComponent,
    data: {
      meta: {
        title: `Messages`
      }
    },
    children: [
      {
        path: ':id',
        component: DetailHeaderMessageSelectedComponent
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})

export class MessagesRoutingModule {
}

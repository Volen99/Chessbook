import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {StreamersComponent} from "./streamers.component";
import {StreamWatchComponent} from "./stream-watch/stream-watch.component";
import {StreamListComponent} from "./stream-list/stream-list.component";
import {ChessbookUsersStreamComponent} from "./stream-list/stream-list-chessbook-users/chessbook-users-stream.component";

const routes: Routes = [
  {
    path: '',
    component: StreamersComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: "list",
        component: StreamListComponent,
      },
      {
        path: 'list/users',
        component: ChessbookUsersStreamComponent,
      },
      {
        path: ':login_name',
        component: StreamWatchComponent,
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})
export class StreamersRoutingModule {
}

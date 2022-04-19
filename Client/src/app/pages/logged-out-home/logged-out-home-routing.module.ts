import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {LoggedOutHomeComponent} from "./logged-out-home.component";
import {UnloggedGuard} from "../../core/routing/unlogged-guard.service";

const routes: Routes = [
  {
    path: '',
    component: LoggedOutHomeComponent,
    canActivate: [ UnloggedGuard ],
    data: {
      meta: {
        title: `Chessbook. It's what's happening in the chess world`
      }
    },
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})
export class LoggedOutHomeRoutingModule {
}

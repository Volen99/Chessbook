import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoggedOutHomeComponent } from './logged-out-home.component';

const loginRoutes: Routes = [
  {
    path: '',
    component: LoggedOutHomeComponent,
    outlet: 'logged-out-home',
    data: {
      reuse: {
        enabled: true,
        key: 'logged-out-home',
      }
    },
    // canActivate: [ MetaGuard ],
    // data: {
    //   meta: {
    //     title: $localize`Login`
    //   }
    // },
    // resolve: {
    //   serverConfig: ServerConfigResolver
    // }
  },

];

@NgModule({
  imports: [ RouterModule.forChild(loginRoutes) ],
  exports: [ RouterModule ]
})
export class LoggedOutHomeRoutingModule {
}

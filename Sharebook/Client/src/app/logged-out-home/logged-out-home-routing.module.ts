import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';

import { ServerConfigResolver } from '../core/routing/server-config-resolver.service';
import { LoggedOutHomeComponent } from './logged-out-home.component';

const loginRoutes: Routes = [
  {
    path: '',
    component: LoggedOutHomeComponent,
    // canActivate: [ MetaGuard ],
    // data: {
    //   meta: {
    //     title: $localize`Login`
    //   }
    // },
    // resolve: {
    //   serverConfig: ServerConfigResolver
    // }
  }
];

@NgModule({
  imports: [ RouterModule.forChild(loginRoutes) ],
  exports: [ RouterModule ]
})
export class LoggedOutHomeRoutingModule {
}

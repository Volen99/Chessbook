import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';
import { AdminComponent } from './admin.component';
import { FollowsRoutes } from './follows';
import { UsersRoutes } from './users';
import { ModerationRoutes } from './moderation';
import { SystemRoutes } from './system';
import { ConfigRoutes } from './config';
import { PluginsRoutes } from './plugins/plugins.routes';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [ MetaGuard ],
    canActivateChild: [ MetaGuard ],
    children: [
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full'
      },
      ...FollowsRoutes,
      ...UsersRoutes,
      ...ModerationRoutes,
      ...SystemRoutes,
      ...ConfigRoutes,
      ...PluginsRoutes,
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(adminRoutes) ],
  exports: [ RouterModule ]
})
export class AdminRoutingModule {
}

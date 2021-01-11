import {Routes} from '@angular/router';
import {PluginsComponent} from "./plugins.component";
import {UserRightGuard} from "../../core/routing/user-right-guard.service";
import {UserRight} from "../../shared/models/users/user-right.enum";
import {PluginListInstalledComponent} from "./plugin-list-installed/plugin-list-installed.component";
import {PluginSearchComponent} from "./plugin-search/plugin-search.component";
import {PluginShowInstalledComponent} from "./plugin-show-installed/plugin-show-installed.component";


export const PluginsRoutes: Routes = [
  {
    path: 'plugins',
    component: PluginsComponent,
    canActivate: [UserRightGuard],
    data: {
      userRight: UserRight.MANAGE_PLUGINS
    },
    children: [
      {
        path: '',
        redirectTo: 'list-installed',
        pathMatch: 'full'
      },
      {
        path: 'list-installed',
        component: PluginListInstalledComponent,
        data: {
          meta: {
            title: $localize`List installed plugins`
          }
        }
      },
      {
        path: 'search',
        component: PluginSearchComponent,
        data: {
          meta: {
            title: $localize`Search plugins`
          }
        }
      },
      {
        path: 'show/:npmName',
        component: PluginShowInstalledComponent,
        data: {
          meta: {
            title: $localize`Show plugin`
          }
        }
      }
    ]
  }
];

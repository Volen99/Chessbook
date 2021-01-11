import {Routes} from '@angular/router';
import {DebugComponent} from './debug';
import {SystemComponent} from './system.component';
import {UserRightGuard} from "../../core/routing/user-right-guard.service";
import {UserRight} from "../../shared/models/users/user-right.enum";
import {LogsComponent} from "./logs/logs.component";
import {JobsComponent} from "./jobs/jobs.component";

export const SystemRoutes: Routes = [
  {
    path: 'system',
    component: SystemComponent,
    children: [
      {
        path: '',
        redirectTo: 'jobs',
        pathMatch: 'full'
      },
      {
        path: 'jobs',
        canActivate: [UserRightGuard],
        component: JobsComponent,
        data: {
          meta: {
            userRight: UserRight.MANAGE_JOBS,
            title: $localize`Jobs`
          }
        }
      },
      {
        path: 'logs',
        canActivate: [UserRightGuard],
        component: LogsComponent,
        data: {
          meta: {
            userRight: UserRight.MANAGE_LOGS,
            title: $localize`Logs`
          }
        }
      },
      {
        path: 'debug',
        canActivate: [UserRightGuard],
        component: DebugComponent,
        data: {
          meta: {
            userRight: UserRight.MANAGE_DEBUG,
            title: $localize`Debug`
          }
        }
      }
    ]
  }
];

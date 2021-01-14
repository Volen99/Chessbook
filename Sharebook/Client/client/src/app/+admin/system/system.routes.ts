import { Routes } from '@angular/router';
import { DebugComponent } from './debug';
import { JobsComponent } from './jobs/jobs.component';
import { LogsComponent } from './logs';
import { SystemComponent } from './system.component';
import { UserRightGuard } from '../../core';
import { UserRight } from '../../../../../shared';

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
        canActivate: [ UserRightGuard ],
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
        canActivate: [ UserRightGuard ],
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
        canActivate: [ UserRightGuard ],
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

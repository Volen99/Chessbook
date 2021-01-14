import { Routes } from '@angular/router';
import { UserRight } from '../../../../../shared/models';
import { ConfigComponent } from './config.component';
import { EditCustomConfigComponent } from './edit-custom-config';
import { UserRightGuard } from '../../core';

export const ConfigRoutes: Routes = [
  {
    path: 'config',
    component: ConfigComponent,
    canActivate: [ UserRightGuard ],
    data: {
      userRight: UserRight.MANAGE_CONFIGURATION
    },
    children: [
      {
        path: '',
        redirectTo: 'edit-custom',
        pathMatch: 'full'
      },
      {
        path: 'edit-custom',
        component: EditCustomConfigComponent,
        data: {
          meta: {
            title: $localize`Edit custom configuration`
          }
        }
      }
    ]
  }
];

import {Routes} from '@angular/router';
import {ConfigComponent} from './config.component';
import {UserRight} from "../../shared/models/users/user-right.enum";
import {UserRightGuard} from "../../core/routing/user-right-guard.service";
import {EditCustomConfigComponent} from "./edit-custom-config/edit-custom-config.component";

export const ConfigRoutes: Routes = [
  {
    path: 'config',
    component: ConfigComponent,
    canActivate: [UserRightGuard],
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
